"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChallsDirty = exports.getGraphUpdate = exports.getGraph = exports.setGraph = exports.getChallengeInfo = exports.getScore = exports.getRange = exports.setLeaderboard = void 0;
const util_1 = require("util");
const client_1 = __importDefault(require("./client"));
const server_1 = __importDefault(require("../config/server"));
const db = __importStar(require("../database"));
const redisEvalsha = util_1.promisify(client_1.default.evalsha.bind(client_1.default));
const redisHget = util_1.promisify(client_1.default.hget.bind(client_1.default));
const redisHmget = util_1.promisify(client_1.default.hmget.bind(client_1.default));
const redisGet = util_1.promisify(client_1.default.get.bind(client_1.default));
const redisSet = util_1.promisify(client_1.default.set.bind(client_1.default));
const redisLlen = util_1.promisify(client_1.default.llen.bind(client_1.default));
const redisScript = util_1.promisify(client_1.default.script.bind(client_1.default));
// The max number of arguments to a lua function is 7999. The cmd and key must be included with every redis call.
// Because hashes are specified as a value after a key, the chunk size must also be even.
// Therefore, the chunk size is set at 7996.
const luaChunkCall = `
  local function chunkCall(cmd, key, args)
    local size = 7996
    local len = #args
    local chunks = math.ceil(len / size)
    for i = 1, chunks do
      local start = (i - 1) * size + 1
      local stop = math.min(len, i * size)
      redis.call(cmd, key, unpack(args, start, stop))
    end
  end
`;
const setLeaderboardScript = redisScript('load', `
  ${luaChunkCall}

  local leaderboard = cjson.decode(ARGV[1])
  local divisions = cjson.decode(ARGV[2])
  local challengeInfo = cjson.decode(ARGV[3])

  local divisionBoards = {}
  local divisionCounts = {}
  local globalBoard = {}
  local positionKeys = {}

  for _, division in ipairs(divisions) do
    divisionBoards[division] = {}
    divisionCounts[division] = 0
  end
  
  -- [id, name, division, currscore, items]
  local numUsers = #leaderboard / 5
  for i = 1, numUsers do
    local division = leaderboard[i * 5 - 2]
    local divisionPosition = divisionCounts[division] + 1
    local divisionBoard = divisionBoards[division]

    divisionCounts[division] = divisionPosition
    -- items
    divisionBoard[divisionPosition * 4] = leaderboard[i * 5]
    -- current sccore
    divisionBoard[divisionPosition * 4 - 1] = leaderboard[i * 5 - 1]
    -- name
    divisionBoard[divisionPosition * 4 - 2] = leaderboard[i * 5 - 3]
    -- id
    divisionBoard[divisionPosition * 4 - 3] = leaderboard[i * 5 - 4]

    globalBoard[i * 4] = leaderboard[i * 5]
    globalBoard[i * 4 - 1] = leaderboard[i * 5 - 1]
    globalBoard[i * 4 - 2] = leaderboard[i * 5 - 3]
    globalBoard[i * 4 - 3] = leaderboard[i * 5 - 4]

    positionKeys[i * 2] = leaderboard[i * 5 - 1] .. "," .. i .. "," .. divisionPosition
    positionKeys[i * 2 - 1] = leaderboard[i * 5 - 4]
  end

  redis.call("DEL", unpack(KEYS))
  if #challengeInfo ~= 0 then
    chunkCall("HSET", KEYS[2], challengeInfo)
  end
  if numUsers ~= 0 then
    chunkCall("HSET", KEYS[1], positionKeys)
    chunkCall("RPUSH", KEYS[3], globalBoard)
    redis.call("SET", KEYS[4], ARGV[4])
    for i, division in ipairs(divisions) do
      local divisionBoard = divisionBoards[division]
      if #divisionBoard ~= 0 then
        chunkCall("RPUSH", KEYS[i + 4], divisionBoard)
      end
    end
  end
`);
const getRangeScript = redisScript('load', `
  local result = redis.call("LRANGE", KEYS[1], ARGV[1], ARGV[2])
  result[#result + 1] = redis.call("LLEN", KEYS[1])
  return result
`);
// this script is not compatible with redis cluster as it computes key names at runtime
const getGraphScript = redisScript('load', `
  local maxUsers = tonumber(ARGV[1])
  local latest = redis.call("LRANGE", KEYS[1], 0, maxUsers * 3 - 1)
  if #latest == 0 then
    return nil
  end
  local users = {}
  for i = 1, maxUsers do
    local id = latest[i * 3 - 2]
    if id ~= nil then
      users[i] = redis.call("HGETALL", "graph:"..id)
    end
  end
  local lastUpdate = redis.call("GET", KEYS[2])
  return cjson.encode({
    lastUpdate,
    latest,
    users
  })
`);
const setGraphScript = redisScript('load', `
  ${luaChunkCall}

  redis.call("SET", KEYS[1], ARGV[1])
  local users = cjson.decode(ARGV[2])
  for i = 1, #users do
    chunkCall("HSET", KEYS[i + 1], users[i])
  end
`);
exports.setLeaderboard = async ({ challengeValues, solveAmount, leaderboard, leaderboardUpdate }) => {
    const divisions = Object.keys(server_1.default.divisions);
    const divisionKeys = divisions.map(getLeaderboardKey);
    const keys = [
        'score-positions',
        'challenge-info',
        'global-leaderboard',
        'leaderboard-update',
        ...divisionKeys
    ];
    const challengeInfo = [];
    challengeValues.forEach((value, key) => {
        challengeInfo.push(key, `${value},${solveAmount.get(key)}`);
    });
    const lbWithItems = [];
    for (const info of leaderboard) {
        const items = await db.store.getEquippedItems({
            userid: info[0],
            type: 'font'
        });
        lbWithItems.push([
            ...info,
            JSON.stringify({
                font: (items === null || items === void 0 ? void 0 : items.font) ? { id: items.font.id, resourceUrl: items.font.resourceUrl } : null,
                background: (items === null || items === void 0 ? void 0 : items.background) ? { id: items.background.id, resourceUrl: items.background.resourceUrl } : null
            })
        ]);
    }
    await redisEvalsha(await setLeaderboardScript, keys.length, ...keys, JSON.stringify(lbWithItems.flat()), JSON.stringify(divisions), JSON.stringify(challengeInfo), leaderboardUpdate);
};
const getLeaderboardKey = (division) => {
    if (division === undefined) {
        return 'global-leaderboard';
    }
    else {
        return 'division-leaderboard:' + division;
    }
};
exports.getRange = async ({ start, end, division, all }) => {
    if (all && (start !== undefined || end !== undefined)) {
        throw new Error('cannot specify all and either start or end');
    }
    if (!all && start === end) {
        // zero-length query - get total only
        return {
            total: (await redisLlen(getLeaderboardKey(division))) / 3,
            leaderboard: []
        };
    }
    const redisResult = await redisEvalsha(await getRangeScript, 1, getLeaderboardKey(division), all ? 0 : start * 3, all ? -1 : end * 3 - 1);
    const result = [];
    for (let i = 0; i < redisResult.length - 1; i += 4) {
        // format the flat redis list response into an array of arrays
        // i is the user id, i + 1 is the user name, i + 2 is the user score
        result.push({
            id: redisResult[i],
            name: redisResult[i + 1],
            score: parseInt(redisResult[i + 2]),
            items: JSON.parse(redisResult[i + 3])
        });
    }
    return {
        total: redisResult[redisResult.length - 1] / 3,
        leaderboard: result
    };
};
exports.getScore = async ({ id }) => {
    const redisResult = await redisHget('score-positions', id);
    if (redisResult === null) {
        return null;
    }
    const split = redisResult.split(',');
    return {
        score: parseInt(split[0]),
        globalPlace: parseInt(split[1]),
        divisionPlace: parseInt(split[2])
    };
};
exports.getChallengeInfo = async ({ ids }) => {
    if (ids.length === 0) {
        return [];
    }
    const redisResult = await redisHmget('challenge-info', ...ids);
    return redisResult.map((info) => {
        if (info === null) {
            return {
                score: null,
                solves: null
            };
        }
        const split = info.split(',');
        return {
            score: parseInt(split[0]),
            solves: parseInt(split[1])
        };
    });
};
exports.setGraph = async ({ leaderboards }) => {
    let lastSample = 0;
    const users = new Map();
    leaderboards.forEach(({ sample, scores }) => {
        if (sample > lastSample) {
            lastSample = sample;
        }
        scores.forEach((score) => {
            const key = `graph:${score[0]}`;
            if (users.has(key)) {
                users.get(key).push(sample, score[1]);
            }
            else {
                users.set(key, [sample, score[1]]);
            }
        });
    });
    if (users.size === 0) {
        return;
    }
    const keys = Array.from(users.keys());
    const values = Array.from(users.values());
    await redisEvalsha([
        await setGraphScript,
        1 + keys.length,
        'graph-update',
        ...keys,
        lastSample,
        JSON.stringify(values)
    ]);
};
exports.getGraph = async ({ division, maxTeams }) => {
    const redisResult = await redisEvalsha(await getGraphScript, 2, getLeaderboardKey(division), 'leaderboard-update', maxTeams);
    if (redisResult === null) {
        return [];
    }
    const parsed = JSON.parse(redisResult);
    const lastUpdate = parseInt(parsed[0]);
    const latest = parsed[1];
    const graphData = parsed[2];
    const result = [];
    for (let userIdx = 0; userIdx < latest.length / 4; userIdx++) {
        const points = [
            {
                time: lastUpdate,
                score: parseInt(latest[userIdx * 4 + 2])
            }
        ];
        const userPoints = graphData[userIdx];
        for (let pointIdx = 0; pointIdx < userPoints.length; pointIdx += 2) {
            points.push({
                time: parseInt(userPoints[pointIdx]),
                score: parseInt(userPoints[pointIdx + 1])
            });
        }
        points.sort((a, b) => b.time - a.time);
        result.push({
            id: latest[userIdx * 4],
            name: latest[userIdx * 4 + 1],
            items: JSON.parse(latest[userIdx * 4 + 3]),
            points
        });
    }
    return result;
};
exports.getGraphUpdate = async () => {
    const redisResult = await redisGet('graph-update');
    return redisResult === null ? 0 : parseInt(redisResult);
};
exports.setChallsDirty = () => {
    return redisSet('graph-update', 0);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvY2FjaGUvbGVhZGVyYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFnQztBQUNoQyxzREFBNkI7QUFDN0IsOERBQXFDO0FBQ3JDLGdEQUFpQztBQUVqQyxNQUFNLFlBQVksR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUMzRCxNQUFNLFNBQVMsR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUNyRCxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUN2RCxNQUFNLFFBQVEsR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUNuRCxNQUFNLFFBQVEsR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUNuRCxNQUFNLFNBQVMsR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUNyRCxNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUV6RCxpSEFBaUg7QUFDakgseUZBQXlGO0FBQ3pGLDRDQUE0QztBQUM1QyxNQUFNLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Q0FXcEIsQ0FBQTtBQUVELE1BQU0sb0JBQW9CLEdBQUcsV0FBVyxD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QUMsQ0FBQztZQUMxQyxNQUFNO1NBQ1AsQ0FBQyxDQUFBO0tBQ0g7SUFDRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUVZLFFBQUEsY0FBYyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3ZDLE1BQU0sV0FBVyxHQUFHLE1BQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ2xELE9BQU8sV0FBVyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDekQsQ0FBQyxDQUFBO0FBRVksUUFBQSxjQUFjLEdBQUcsR0FBRyxFQUFFO0lBQ2pDLE9BQU8sUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICd1dGlsJ1xuaW1wb3J0IGNsaWVudCBmcm9tICcuL2NsaWVudCdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL3NlcnZlcidcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uL2RhdGFiYXNlJ1xuXG5jb25zdCByZWRpc0V2YWxzaGEgPSBwcm9taXNpZnkoY2xpZW50LmV2YWxzaGEuYmluZChjbGllbnQpKVxuY29uc3QgcmVkaXNIZ2V0ID0gcHJvbWlzaWZ5KGNsaWVudC5oZ2V0LmJpbmQoY2xpZW50KSlcbmNvbnN0IHJlZGlzSG1nZXQgPSBwcm9taXNpZnkoY2xpZW50LmhtZ2V0LmJpbmQoY2xpZW50KSlcbmNvbnN0IHJlZGlzR2V0ID0gcHJvbWlzaWZ5KGNsaWVudC5nZXQuYmluZChjbGllbnQpKVxuY29uc3QgcmVkaXNTZXQgPSBwcm9taXNpZnkoY2xpZW50LnNldC5iaW5kKGNsaWVudCkpXG5jb25zdCByZWRpc0xsZW4gPSBwcm9taXNpZnkoY2xpZW50LmxsZW4uYmluZChjbGllbnQpKVxuY29uc3QgcmVkaXNTY3JpcHQgPSBwcm9taXNpZnkoY2xpZW50LnNjcmlwdC5iaW5kKGNsaWVudCkpXG5cbi8vIFRoZSBtYXggbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBhIGx1YSBmdW5jdGlvbiBpcyA3OTk5LiBUaGUgY21kIGFuZCBrZXkgbXVzdCBiZSBpbmNsdWRlZCB3aXRoIGV2ZXJ5IHJlZGlzIGNhbGwuXG4vLyBCZWNhdXNlIGhhc2hlcyBhcmUgc3BlY2lmaWVkIGFzIGEgdmFsdWUgYWZ0ZXIgYSBrZXksIHRoZSBjaHVuayBzaXplIG11c3QgYWxzbyBiZSBldmVuLlxuLy8gVGhlcmVmb3JlLCB0aGUgY2h1bmsgc2l6ZSBpcyBzZXQgYXQgNzk5Ni5cbmNvbnN0IGx1YUNodW5rQ2FsbCA9IGBcbiAgbG9jYWwgZnVuY3Rpb24gY2h1bmtDYWxsKGNtZCwga2V5LCBhcmdzKVxuICAgIGxvY2FsIHNpemUgPSA3OTk2XG4gICAgbG9jYWwgbGVuID0gI2FyZ3NcbiAgICBsb2NhbCBjaHVua3MgPSBtYXRoLmNlaWwobGVuIC8gc2l6ZSlcbiAgICBmb3IgaSA9IDEsIGNodW5rcyBkb1xuICAgICAgbG9jYWwgc3RhcnQgPSAoaSAtIDEpICogc2l6ZSArIDFcbiAgICAgIGxvY2FsIHN0b3AgPSBtYXRoLm1pbihsZW4sIGkgKiBzaXplKVxuICAgICAgcmVkaXMuY2FsbChjbWQsIGtleSwgdW5wYWNrKGFyZ3MsIHN0YXJ0LCBzdG9wKSlcbiAgICBlbmRcbiAgZW5kXG5gXG5cbmNvbnN0IHNldExlYWRlcmJvYXJkU2NyaXB0ID0gcmVkaXNTY3JpcHQoXG4gICdsb2FkJyxcbiAgYFxuICAke2x1YUNodW5rQ2FsbH1cblxuICBsb2NhbCBsZWFkZXJib2FyZCA9IGNqc29uLmRlY29kZShBUkdWWzFdKVxuICBsb2NhbCBkaXZpc2lvbnMgPSBjanNvbi5kZWNvZGUoQVJHVlsyXSlcbiAgbG9jYWwgY2hhbGxlbmdlSW5mbyA9IGNqc29uLmRlY29kZShBUkdWWzNdKVxuXG4gIGxvY2FsIGRpdmlzaW9uQm9hcmRzID0ge31cbiAgbG9jYWwgZGl2aXNpb25Db3VudHMgPSB7fVxuICBsb2NhbCBnbG9iYWxCb2FyZCA9IHt9XG4gIGxvY2FsIHBvc2l0aW9uS2V5cyA9IHt9XG5cbiAgZm9yIF8sIGRpdmlzaW9uIGluIGlwYWlycyhkaXZpc2lvbnMpIGRvXG4gICAgZGl2aXNpb25Cb2FyZHNbZGl2aXNpb25dID0ge31cbiAgICBkaXZpc2lvbkNvdW50c1tkaXZpc2lvbl0gPSAwXG4gIGVuZFxuICBcbiAgLS0gW2lkLCBuYW1lLCBkaXZpc2lvbiwgY3VycnNjb3JlLCBpdGVtc11cbiAgbG9jYWwgbnVtVXNlcnMgPSAjbGVhZGVyYm9hcmQgLyA1XG4gIGZvciBpID0gMSwgbnVtVXNlcnMgZG9cbiAgICBsb2NhbCBkaXZpc2lvbiA9IGxlYWRlcmJvYXJkW2kgKiA1IC0gMl1cbiAgICBsb2NhbCBkaXZpc2lvblBvc2l0aW9uID0gZGl2aXNpb25Db3VudHNbZGl2aXNpb25dICsgMVxuICAgIGxvY2FsIGRpdmlzaW9uQm9hcmQgPSBkaXZpc2lvbkJvYXJkc1tkaXZpc2lvbl1cblxuICAgIGRpdmlzaW9uQ291bnRzW2RpdmlzaW9uXSA9IGRpdmlzaW9uUG9zaXRpb25cbiAgICAtLSBpdGVtc1xuICAgIGRpdmlzaW9uQm9hcmRbZGl2aXNpb25Qb3NpdGlvbiAqIDRdID0gbGVhZGVyYm9hcmRbaSAqIDVdXG4gICAgLS0gY3VycmVudCBzY2NvcmVcbiAgICBkaXZpc2lvbkJvYXJkW2RpdmlzaW9uUG9zaXRpb24gKiA0IC0gMV0gPSBsZWFkZXJib2FyZFtpICogNSAtIDFdXG4gICAgLS0gbmFtZVxuICAgIGRpdmlzaW9uQm9hcmRbZGl2aXNpb25Qb3NpdGlvbiAqIDQgLSAyXSA9IGxlYWRlcmJvYXJkW2kgKiA1IC0gM11cbiAgICAtLSBpZFxuICAgIGRpdmlzaW9uQm9hcmRbZGl2aXNpb25Qb3NpdGlvbiAqIDQgLSAzXSA9IGxlYWRlcmJvYXJkW2kgKiA1IC0gNF1cblxuICAgIGdsb2JhbEJvYXJkW2kgKiA0XSA9IGxlYWRlcmJvYXJkW2kgKiA1XVxuICAgIGdsb2JhbEJvYXJkW2kgKiA0IC0gMV0gPSBsZWFkZXJib2FyZFtpICogNSAtIDFdXG4gICAgZ2xvYmFsQm9hcmRbaSAqIDQgLSAyXSA9IGxlYWRlcmJvYXJkW2kgKiA1IC0gM11cbiAgICBnbG9iYWxCb2FyZFtpICogNCAtIDNdID0gbGVhZGVyYm9hcmRbaSAqIDUgLSA0XVxuXG4gICAgcG9zaXRpb25LZXlzW2kgKiAyXSA9IGxlYWRlcmJvYXJkW2kgKiA1IC0gMV0gLi4gXCIsXCIgLi4gaSAuLiBcIixcIiAuLiBkaXZpc2lvblBvc2l0aW9uXG4gICAgcG9zaXRpb25LZXlzW2kgKiAyIC0gMV0gPSBsZWFkZXJib2FyZFtpICogNSAtIDRdXG4gIGVuZFxuXG4gIHJlZGlzLmNhbGwoXCJERUxcIiwgdW5wYWNrKEtFWVMpKVxuICBpZiAjY2hhbGxlbmdlSW5mbyB+PSAwIHRoZW5cbiAgICBjaHVua0NhbGwoXCJIU0VUXCIsIEtFWVNbMl0sIGNoYWxsZW5nZUluZm8pXG4gIGVuZFxuICBpZiBudW1Vc2VycyB+PSAwIHRoZW5cbiAgICBjaHVua0NhbGwoXCJIU0VUXCIsIEtFWVNbMV0sIHBvc2l0aW9uS2V5cylcbiAgICBjaHVua0NhbGwoXCJSUFVTSFwiLCBLRVlTWzNdLCBnbG9iYWxCb2FyZClcbiAgICByZWRpcy5jYWxsKFwiU0VUXCIsIEtFWVNbNF0sIEFSR1ZbNF0pXG4gICAgZm9yIGksIGRpdmlzaW9uIGluIGlwYWlycyhkaXZpc2lvbnMpIGRvXG4gICAgICBsb2NhbCBkaXZpc2lvbkJvYXJkID0gZGl2aXNpb25Cb2FyZHNbZGl2aXNpb25dXG4gICAgICBpZiAjZGl2aXNpb25Cb2FyZCB+PSAwIHRoZW5cbiAgICAgICAgY2h1bmtDYWxsKFwiUlBVU0hcIiwgS0VZU1tpICsgNF0sIGRpdmlzaW9uQm9hcmQpXG4gICAgICBlbmRcbiAgICBlbmRcbiAgZW5kXG5gXG4pXG5cbmNvbnN0IGdldFJhbmdlU2NyaXB0ID0gcmVkaXNTY3JpcHQoXG4gICdsb2FkJyxcbiAgYFxuICBsb2NhbCByZXN1bHQgPSByZWRpcy5jYWxsKFwiTFJBTkdFXCIsIEtFWVNbMV0sIEFSR1ZbMV0sIEFSR1ZbMl0pXG4gIHJlc3VsdFsjcmVzdWx0ICsgMV0gPSByZWRpcy5jYWxsKFwiTExFTlwiLCBLRVlTWzFdKVxuICByZXR1cm4gcmVzdWx0XG5gXG4pXG5cbi8vIHRoaXMgc2NyaXB0IGlzIG5vdCBjb21wYXRpYmxlIHdpdGggcmVkaXMgY2x1c3RlciBhcyBpdCBjb21wdXRlcyBrZXkgbmFtZXMgYXQgcnVudGltZVxuY29uc3QgZ2V0R3JhcGhTY3JpcHQgPSByZWRpc1NjcmlwdChcbiAgJ2xvYWQnLFxuICBgXG4gIGxvY2FsIG1heFVzZXJzID0gdG9udW1iZXIoQVJHVlsxXSlcbiAgbG9jYWwgbGF0ZXN0ID0gcmVkaXMuY2FsbChcIkxSQU5HRVwiLCBLRVlTWzFdLCAwLCBtYXhVc2VycyAqIDMgLSAxKVxuICBpZiAjbGF0ZXN0ID09IDAgdGhlblxuICAgIHJldHVybiBuaWxcbiAgZW5kXG4gIGxvY2FsIHVzZXJzID0ge31cbiAgZm9yIGkgPSAxLCBtYXhVc2VycyBkb1xuICAgIGxvY2FsIGlkID0gbGF0ZXN0W2kgKiAzIC0gMl1cbiAgICBpZiBpZCB+PSBuaWwgdGhlblxuICAgICAgdXNlcnNbaV0gPSByZWRpcy5jYWxsKFwiSEdFVEFMTFwiLCBcImdyYXBoOlwiLi5pZClcbiAgICBlbmRcbiAgZW5kXG4gIGxvY2FsIGxhc3RVcGRhdGUgPSByZWRpcy5jYWxsKFwiR0VUXCIsIEtFWVNbMl0pXG4gIHJldHVybiBjanNvbi5lbmNvZGUoe1xuICAgIGxhc3RVcGRhdGUsXG4gICAgbGF0ZXN0LFxuICAgIHVzZXJzXG4gIH0pXG5gXG4pXG5cbmNvbnN0IHNldEdyYXBoU2NyaXB0ID0gcmVkaXNTY3JpcHQoXG4gICdsb2FkJyxcbiAgYFxuICAke2x1YUNodW5rQ2FsbH1cblxuICByZWRpcy5jYWxsKFwiU0VUXCIsIEtFWVNbMV0sIEFSR1ZbMV0pXG4gIGxvY2FsIHVzZXJzID0gY2pzb24uZGVjb2RlKEFSR1ZbMl0pXG4gIGZvciBpID0gMSwgI3VzZXJzIGRvXG4gICAgY2h1bmtDYWxsKFwiSFNFVFwiLCBLRVlTW2kgKyAxXSwgdXNlcnNbaV0pXG4gIGVuZFxuYFxuKVxuXG5leHBvcnQgY29uc3Qgc2V0TGVhZGVyYm9hcmQgPSBhc3luYyAoe1xuICBjaGFsbGVuZ2VWYWx1ZXMsXG4gIHNvbHZlQW1vdW50LFxuICBsZWFkZXJib2FyZCxcbiAgbGVhZGVyYm9hcmRVcGRhdGVcbn0pID0+IHtcbiAgY29uc3QgZGl2aXNpb25zID0gT2JqZWN0LmtleXMoY29uZmlnLmRpdmlzaW9ucylcbiAgY29uc3QgZGl2aXNpb25LZXlzID0gZGl2aXNpb25zLm1hcChnZXRMZWFkZXJib2FyZEtleSlcbiAgY29uc3Qga2V5cyA9IFtcbiAgICAnc2NvcmUtcG9zaXRpb25zJyxcbiAgICAnY2hhbGxlbmdlLWluZm8nLFxuICAgICdnbG9iYWwtbGVhZGVyYm9hcmQnLFxuICAgICdsZWFkZXJib2FyZC11cGRhdGUnLFxuICAgIC4uLmRpdmlzaW9uS2V5c1xuICBdXG4gIGNvbnN0IGNoYWxsZW5nZUluZm8gPSBbXVxuICBjaGFsbGVuZ2VWYWx1ZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgIGNoYWxsZW5nZUluZm8ucHVzaChrZXksIGAke3ZhbHVlfSwke3NvbHZlQW1vdW50LmdldChrZXkpfWApXG4gIH0pXG4gIGNvbnN0IGxiV2l0aEl0ZW1zID0gW11cbiAgZm9yIChjb25zdCBpbmZvIG9mIGxlYWRlcmJvYXJkKSB7XG4gICAgXG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCBkYi5zdG9yZS5nZXRFcXVpcHBlZEl0ZW1zKHtcbiAgICAgIHVzZXJpZDogaW5mb1swXSxcbiAgICAgIHR5cGU6ICdmb250J1xuICAgIH0pXG4gICAgXG4gICAgXG4gICAgbGJXaXRoSXRlbXMucHVzaChbXG4gICAgICAuLi5pbmZvLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBmb250OiBpdGVtcz8uZm9udCA/IHsgaWQ6IGl0ZW1zLmZvbnQuaWQsIHJlc291cmNlVXJsOiBpdGVtcy5mb250LnJlc291cmNlVXJsIH0gOiBudWxsLFxuICAgICAgICBiYWNrZ3JvdW5kOiBpdGVtcz8uYmFja2dyb3VuZCA/IHsgaWQ6IGl0ZW1zLmJhY2tncm91bmQuaWQsIHJlc291cmNlVXJsOiBpdGVtcy5iYWNrZ3JvdW5kLnJlc291cmNlVXJsIH0gOiBudWxsXG4gICAgICB9KVxuICAgIF0pXG4gIH1cblxuICBhd2FpdCByZWRpc0V2YWxzaGEoXG4gICAgYXdhaXQgc2V0TGVhZGVyYm9hcmRTY3JpcHQsXG4gICAga2V5cy5sZW5ndGgsXG4gICAgLi4ua2V5cyxcbiAgICBKU09OLnN0cmluZ2lmeShsYldpdGhJdGVtcy5mbGF0KCkpLFxuICAgIEpTT04uc3RyaW5naWZ5KGRpdmlzaW9ucyksXG4gICAgSlNPTi5zdHJpbmdpZnkoY2hhbGxlbmdlSW5mbyksXG4gICAgbGVhZGVyYm9hcmRVcGRhdGVcbiAgKVxufVxuXG5jb25zdCBnZXRMZWFkZXJib2FyZEtleSA9IChkaXZpc2lvbikgPT4ge1xuICBpZiAoZGl2aXNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAnZ2xvYmFsLWxlYWRlcmJvYXJkJ1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnZGl2aXNpb24tbGVhZGVyYm9hcmQ6JyArIGRpdmlzaW9uXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldFJhbmdlID0gYXN5bmMgKHsgc3RhcnQsIGVuZCwgZGl2aXNpb24sIGFsbCB9KSA9PiB7XG4gIGlmIChhbGwgJiYgKHN0YXJ0ICE9PSB1bmRlZmluZWQgfHwgZW5kICE9PSB1bmRlZmluZWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3Qgc3BlY2lmeSBhbGwgYW5kIGVpdGhlciBzdGFydCBvciBlbmQnKVxuICB9XG4gIGlmICghYWxsICYmIHN0YXJ0ID09PSBlbmQpIHtcbiAgICAvLyB6ZXJvLWxlbmd0aCBxdWVyeSAtIGdldCB0b3RhbCBvbmx5XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvdGFsOiAoYXdhaXQgcmVkaXNMbGVuKGdldExlYWRlcmJvYXJkS2V5KGRpdmlzaW9uKSkpIC8gMyxcbiAgICAgIGxlYWRlcmJvYXJkOiBbXVxuICAgIH1cbiAgfVxuICBjb25zdCByZWRpc1Jlc3VsdCA9IGF3YWl0IHJlZGlzRXZhbHNoYShcbiAgICBhd2FpdCBnZXRSYW5nZVNjcmlwdCxcbiAgICAxLFxuICAgIGdldExlYWRlcmJvYXJkS2V5KGRpdmlzaW9uKSxcbiAgICBhbGwgPyAwIDogc3RhcnQgKiAzLFxuICAgIGFsbCA/IC0xIDogZW5kICogMyAtIDFcbiAgKVxuICBjb25zdCByZXN1bHQgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZGlzUmVzdWx0Lmxlbmd0aCAtIDE7IGkgKz0gNCkge1xuICAgIC8vIGZvcm1hdCB0aGUgZmxhdCByZWRpcyBsaXN0IHJlc3BvbnNlIGludG8gYW4gYXJyYXkgb2YgYXJyYXlzXG4gICAgLy8gaSBpcyB0aGUgdXNlciBpZCwgaSArIDEgaXMgdGhlIHVzZXIgbmFtZSwgaSArIDIgaXMgdGhlIHVzZXIgc2NvcmVcbiAgICByZXN1bHQucHVzaCh7XG4gICAgICBpZDogcmVkaXNSZXN1bHRbaV0sXG4gICAgICBuYW1lOiByZWRpc1Jlc3VsdFtpICsgMV0sXG4gICAgICBzY29yZTogcGFyc2VJbnQocmVkaXNSZXN1bHRbaSArIDJdKSxcbiAgICAgIGl0ZW1zOiBKU09OLnBhcnNlKHJlZGlzUmVzdWx0W2kgKyAzXSlcbiAgICB9KVxuICB9XG4gIHJldHVybiB7XG4gICAgdG90YWw6IHJlZGlzUmVzdWx0W3JlZGlzUmVzdWx0Lmxlbmd0aCAtIDFdIC8gMyxcbiAgICBsZWFkZXJib2FyZDogcmVzdWx0XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldFNjb3JlID0gYXN5bmMgKHsgaWQgfSkgPT4ge1xuICBjb25zdCByZWRpc1Jlc3VsdCA9IGF3YWl0IHJlZGlzSGdldCgnc2NvcmUtcG9zaXRpb25zJywgaWQpXG4gIGlmIChyZWRpc1Jlc3VsdCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgY29uc3Qgc3BsaXQgPSByZWRpc1Jlc3VsdC5zcGxpdCgnLCcpXG4gIHJldHVybiB7XG4gICAgc2NvcmU6IHBhcnNlSW50KHNwbGl0WzBdKSxcbiAgICBnbG9iYWxQbGFjZTogcGFyc2VJbnQoc3BsaXRbMV0pLFxuICAgIGRpdmlzaW9uUGxhY2U6IHBhcnNlSW50KHNwbGl0WzJdKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDaGFsbGVuZ2VJbmZvID0gYXN5bmMgKHsgaWRzIH0pID0+IHtcbiAgaWYgKGlkcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBjb25zdCByZWRpc1Jlc3VsdCA9IGF3YWl0IHJlZGlzSG1nZXQoJ2NoYWxsZW5nZS1pbmZvJywgLi4uaWRzKVxuICByZXR1cm4gcmVkaXNSZXN1bHQubWFwKChpbmZvKSA9PiB7XG4gICAgaWYgKGluZm8gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjb3JlOiBudWxsLFxuICAgICAgICBzb2x2ZXM6IG51bGxcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3BsaXQgPSBpbmZvLnNwbGl0KCcsJylcbiAgICByZXR1cm4ge1xuICAgICAgc2NvcmU6IHBhcnNlSW50KHNwbGl0WzBdKSxcbiAgICAgIHNvbHZlczogcGFyc2VJbnQoc3BsaXRbMV0pXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc2V0R3JhcGggPSBhc3luYyAoeyBsZWFkZXJib2FyZHMgfSkgPT4ge1xuICBsZXQgbGFzdFNhbXBsZSA9IDBcbiAgY29uc3QgdXNlcnMgPSBuZXcgTWFwKClcbiAgbGVhZGVyYm9hcmRzLmZvckVhY2goKHsgc2FtcGxlLCBzY29yZXMgfSkgPT4ge1xuICAgIGlmIChzYW1wbGUgPiBsYXN0U2FtcGxlKSB7XG4gICAgICBsYXN0U2FtcGxlID0gc2FtcGxlXG4gICAgfVxuICAgIHNjb3Jlcy5mb3JFYWNoKChzY29yZSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gYGdyYXBoOiR7c2NvcmVbMF19YFxuICAgICAgaWYgKHVzZXJzLmhhcyhrZXkpKSB7XG4gICAgICAgIHVzZXJzLmdldChrZXkpLnB1c2goc2FtcGxlLCBzY29yZVsxXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVzZXJzLnNldChrZXksIFtzYW1wbGUsIHNjb3JlWzFdXSlcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuICBpZiAodXNlcnMuc2l6ZSA9PT0gMCkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGtleXMgPSBBcnJheS5mcm9tKHVzZXJzLmtleXMoKSlcbiAgY29uc3QgdmFsdWVzID0gQXJyYXkuZnJvbSh1c2Vycy52YWx1ZXMoKSlcbiAgYXdhaXQgcmVkaXNFdmFsc2hhKFtcbiAgICBhd2FpdCBzZXRHcmFwaFNjcmlwdCxcbiAgICAxICsga2V5cy5sZW5ndGgsXG4gICAgJ2dyYXBoLXVwZGF0ZScsXG4gICAgLi4ua2V5cyxcbiAgICBsYXN0U2FtcGxlLFxuICAgIEpTT04uc3RyaW5naWZ5KHZhbHVlcylcbiAgXSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldEdyYXBoID0gYXN5bmMgKHsgZGl2aXNpb24sIG1heFRlYW1zIH0pID0+IHtcbiAgY29uc3QgcmVkaXNSZXN1bHQgPSBhd2FpdCByZWRpc0V2YWxzaGEoXG4gICAgYXdhaXQgZ2V0R3JhcGhTY3JpcHQsXG4gICAgMixcbiAgICBnZXRMZWFkZXJib2FyZEtleShkaXZpc2lvbiksXG4gICAgJ2xlYWRlcmJvYXJkLXVwZGF0ZScsXG4gICAgbWF4VGVhbXNcbiAgKVxuICBpZiAocmVkaXNSZXN1bHQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJlZGlzUmVzdWx0KVxuICBjb25zdCBsYXN0VXBkYXRlID0gcGFyc2VJbnQocGFyc2VkWzBdKVxuICBjb25zdCBsYXRlc3QgPSBwYXJzZWRbMV1cbiAgY29uc3QgZ3JhcGhEYXRhID0gcGFyc2VkWzJdXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAobGV0IHVzZXJJZHggPSAwOyB1c2VySWR4IDwgbGF0ZXN0Lmxlbmd0aCAvIDQ7IHVzZXJJZHgrKykge1xuICAgIGNvbnN0IHBvaW50cyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGltZTogbGFzdFVwZGF0ZSxcbiAgICAgICAgc2NvcmU6IHBhcnNlSW50KGxhdGVzdFt1c2VySWR4ICogNCArIDJdKVxuICAgICAgfVxuICAgIF1cbiAgICBjb25zdCB1c2VyUG9pbnRzID0gZ3JhcGhEYXRhW3VzZXJJZHhdXG4gICAgZm9yIChsZXQgcG9pbnRJZHggPSAwOyBwb2ludElkeCA8IHVzZXJQb2ludHMubGVuZ3RoOyBwb2ludElkeCArPSAyKSB7XG4gICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgIHRpbWU6IHBhcnNlSW50KHVzZXJQb2ludHNbcG9pbnRJZHhdKSxcbiAgICAgICAgc2NvcmU6IHBhcnNlSW50KHVzZXJQb2ludHNbcG9pbnRJZHggKyAxXSlcbiAgICAgIH0pXG4gICAgfVxuICAgIHBvaW50cy5zb3J0KChhLCBiKSA9PiBiLnRpbWUgLSBhLnRpbWUpXG4gICAgcmVzdWx0LnB1c2goe1xuICAgICAgaWQ6IGxhdGVzdFt1c2VySWR4ICogNF0sXG4gICAgICBuYW1lOiBsYXRlc3RbdXNlcklkeCAqIDQgKyAxXSxcbiAgICAgIGl0ZW1zOiBKU09OLnBhcnNlKGxhdGVzdFt1c2VySWR4ICogNCArIDNdKSxcbiAgICAgIHBvaW50c1xuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgY29uc3QgZ2V0R3JhcGhVcGRhdGUgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlZGlzUmVzdWx0ID0gYXdhaXQgcmVkaXNHZXQoJ2dyYXBoLXVwZGF0ZScpXG4gIHJldHVybiByZWRpc1Jlc3VsdCA9PT0gbnVsbCA/IDAgOiBwYXJzZUludChyZWRpc1Jlc3VsdClcbn1cblxuZXhwb3J0IGNvbnN0IHNldENoYWxsc0RpcnR5ID0gKCkgPT4ge1xuICByZXR1cm4gcmVkaXNTZXQoJ2dyYXBoLXVwZGF0ZScsIDApXG59XG4iXX0=