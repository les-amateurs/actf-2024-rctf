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
const crypto_1 = __importDefault(require("crypto"));
const db = __importStar(require("../../database"));
const challenges = __importStar(require("../../challenges"));
const responses_1 = require("../../responses");
const server_1 = __importDefault(require("../../config/server"));
const timeouts = __importStar(require("../../cache/timeouts"));
const uuid_1 = require("uuid");
const paranoia = __importStar(require("../../paranoia"));
const leaderboard_1 = require("../../cache/leaderboard");
exports.default = {
    method: 'POST',
    path: '/challs/:id/submit',
    requireAuth: true,
    schema: {
        body: {
            type: 'object',
            properties: {
                flag: {
                    type: 'string'
                }
            },
            required: ['flag']
        },
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                }
            },
            required: ['id']
        }
    },
    handler: async ({ req, user }) => {
        const uuid = user.id;
        const timeNow = Date.now();
        if (timeNow < server_1.default.startTime) {
            return responses_1.responses.badNotStarted;
        }
        if (timeNow > server_1.default.endTime) {
            return responses_1.responses.badEnded;
        }
        const challengeid = req.params.id;
        const submittedFlag = req.body.flag;
        const challenge = challenges.getChallenge(challengeid);
        const paranoiaReq = [user, req.ip, challengeid, submittedFlag, false];
        req.log.info({
            chall: challengeid,
            flag: submittedFlag
        }, 'flag submission attempt');
        if (!challenge) {
            return responses_1.responses.badChallenge;
        }
        const passRateLimit = await timeouts.checkRateLimit({
            type: timeouts.getChallengeType(challengeid),
            userid: uuid,
            duration: 10 * 1000,
            limit: 3
        });
        if (!passRateLimit.ok) {
            req.log.warn({
                timeLeft: passRateLimit.timeLeft
            }, 'flag submission rate limit exceeded');
            paranoia.submit(paranoiaReq);
            return [
                responses_1.responses.badRateLimit,
                {
                    timeLeft: passRateLimit.timeLeft
                }
            ];
        }
        const bufSubmittedFlag = Buffer.from(submittedFlag);
        const bufCorrectFlag = Buffer.from(challenge.flag);
        if (bufSubmittedFlag.length !== bufCorrectFlag.length) {
            paranoia.submit(paranoiaReq);
            return responses_1.responses.badFlag;
        }
        if (!crypto_1.default.timingSafeEqual(bufSubmittedFlag, bufCorrectFlag)) {
            paranoia.submit(paranoiaReq);
            return responses_1.responses.badFlag;
        }
        try {
            await db.solves.newSolve({
                id: uuid_1.v4(),
                challengeid: challengeid,
                userid: uuid,
                createdat: new Date()
            });
            paranoiaReq.accepted = true;
            paranoia.submit(paranoiaReq);
            const { score, solves } = (await leaderboard_1.getChallengeInfo({ ids: [challengeid] }))[0];
            if (solves === 0) {
                db.store.addChips(uuid, score + 150);
            }
            else {
                db.store.addChips(uuid, score);
            }
            return responses_1.responses.goodFlag;
        }
        catch (e) {
            if (e.constraint === 'uq') {
                // not a unique submission, so the user already solved
                return responses_1.responses.badAlreadySolvedChallenge;
            }
            if (e.constraint === 'uuid_fkey') {
                // the user referenced by the solve isnt in the users table
                return responses_1.responses.badUnknownUser;
            }
            throw e;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9jaGFsbHMvc3VibWl0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUEyQjtBQUMzQixtREFBb0M7QUFDcEMsNkRBQThDO0FBQzlDLCtDQUEyQztBQUMzQyxpRUFBd0M7QUFDeEMsK0RBQWdEO0FBQ2hELCtCQUFtQztBQUNuQyx5REFBMEM7QUFDMUMseURBQTBEO0FBRTFELGtCQUFlO0lBQ2IsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ25CO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFO29CQUNGLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDakI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUMvQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO1FBRXBCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUMxQixJQUFJLE9BQU8sR0FBRyxnQkFBTSxDQUFDLFNBQVMsRUFBRTtZQUM5QixPQUFPLHFCQUFTLENBQUMsYUFBYSxDQUFBO1NBQy9CO1FBQ0QsSUFBSSxPQUFPLEdBQUcsZ0JBQU0sQ0FBQyxPQUFPLEVBQUU7WUFD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Q0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO2FBQy9CO1lBQ0QsT0FBTyxxQkFBUyxDQUFDLFFBQVEsQ0FBQTtTQUMxQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDekIsc0RBQXNEO2dCQUN0RCxPQUFPLHFCQUFTLENBQUMseUJBQXlCLENBQUE7YUFDM0M7WUFDRCxJQUFJLENBQUMsQ0FBQyxVQUFVLEtBQUssV0FBVyxFQUFFO2dCQUNoQywyREFBMkQ7Z0JBQzNELE9BQU8scUJBQVMsQ0FBQyxjQUFjLENBQUE7YUFDaEM7WUFDRCxNQUFNLENBQUMsQ0FBQTtTQUNSO0lBQ0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0bydcbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uLy4uL2RhdGFiYXNlJ1xuaW1wb3J0ICogYXMgY2hhbGxlbmdlcyBmcm9tICcuLi8uLi9jaGFsbGVuZ2VzJ1xuaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvc2VydmVyJ1xuaW1wb3J0ICogYXMgdGltZW91dHMgZnJvbSAnLi4vLi4vY2FjaGUvdGltZW91dHMnXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJ1xuaW1wb3J0ICogYXMgcGFyYW5vaWEgZnJvbSAnLi4vLi4vcGFyYW5vaWEnXG5pbXBvcnQgeyBnZXRDaGFsbGVuZ2VJbmZvIH0gZnJvbSAnLi4vLi4vY2FjaGUvbGVhZGVyYm9hcmQnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnUE9TVCcsXG4gIHBhdGg6ICcvY2hhbGxzLzppZC9zdWJtaXQnLFxuICByZXF1aXJlQXV0aDogdHJ1ZSxcbiAgc2NoZW1hOiB7XG4gICAgYm9keToge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGZsYWc6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFsnZmxhZyddXG4gICAgfSxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBpZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogWydpZCddXG4gICAgfVxuICB9LFxuICBoYW5kbGVyOiBhc3luYyAoeyByZXEsIHVzZXIgfSkgPT4ge1xuICAgIGNvbnN0IHV1aWQgPSB1c2VyLmlkXG5cbiAgICBjb25zdCB0aW1lTm93ID0gRGF0ZS5ub3coKVxuICAgIGlmICh0aW1lTm93IDwgY29uZmlnLnN0YXJ0VGltZSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWROb3RTdGFydGVkXG4gICAgfVxuICAgIGlmICh0aW1lTm93ID4gY29uZmlnLmVuZFRpbWUpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRW5kZWRcbiAgICB9XG5cbiAgICBjb25zdCBjaGFsbGVuZ2VpZCA9IHJlcS5wYXJhbXMuaWRcbiAgICBjb25zdCBzdWJtaXR0ZWRGbGFnID0gcmVxLmJvZHkuZmxhZ1xuXG4gICAgY29uc3QgY2hhbGxlbmdlID0gY2hhbGxlbmdlcy5nZXRDaGFsbGVuZ2UoY2hhbGxlbmdlaWQpXG5cbiAgICBjb25zdCBwYXJhbm9pYVJlcSA9IFt1c2VyLCByZXEuaXAsIGNoYWxsZW5nZWlkLCBzdWJtaXR0ZWRGbGFnLCBmYWxzZV1cblxuICAgIHJlcS5sb2cuaW5mbyhcbiAgICAgIHtcbiAgICAgICAgY2hhbGw6IGNoYWxsZW5nZWlkLFxuICAgICAgICBmbGFnOiBzdWJtaXR0ZWRGbGFnXG4gICAgICB9LFxuICAgICAgJ2ZsYWcgc3VibWlzc2lvbiBhdHRlbXB0J1xuICAgIClcblxuICAgIGlmICghY2hhbGxlbmdlKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZENoYWxsZW5nZVxuICAgIH1cblxuICAgIGNvbnN0IHBhc3NSYXRlTGltaXQgPSBhd2FpdCB0aW1lb3V0cy5jaGVja1JhdGVMaW1pdCh7XG4gICAgICB0eXBlOiB0aW1lb3V0cy5nZXRDaGFsbGVuZ2VUeXBlKGNoYWxsZW5nZWlkKSxcbiAgICAgIHVzZXJpZDogdXVpZCxcbiAgICAgIGR1cmF0aW9uOiAxMCAqIDEwMDAsXG4gICAgICBsaW1pdDogM1xuICAgIH0pXG5cbiAgICBpZiAoIXBhc3NSYXRlTGltaXQub2spIHtcbiAgICAgIHJlcS5sb2cud2FybihcbiAgICAgICAge1xuICAgICAgICAgIHRpbWVMZWZ0OiBwYXNzUmF0ZUxpbWl0LnRpbWVMZWZ0XG4gICAgICAgIH0sXG4gICAgICAgICdmbGFnIHN1Ym1pc3Npb24gcmF0ZSBsaW1pdCBleGNlZWRlZCdcbiAgICAgIClcblxuICAgICAgcGFyYW5vaWEuc3VibWl0KHBhcmFub2lhUmVxKVxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgcmVzcG9uc2VzLmJhZFJhdGVMaW1pdCxcbiAgICAgICAge1xuICAgICAgICAgIHRpbWVMZWZ0OiBwYXNzUmF0ZUxpbWl0LnRpbWVMZWZ0XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG5cbiAgICBjb25zdCBidWZTdWJtaXR0ZWRGbGFnID0gQnVmZmVyLmZyb20oc3VibWl0dGVkRmxhZylcbiAgICBjb25zdCBidWZDb3JyZWN0RmxhZyA9IEJ1ZmZlci5mcm9tKGNoYWxsZW5nZS5mbGFnKVxuXG4gICAgaWYgKGJ1ZlN1Ym1pdHRlZEZsYWcubGVuZ3RoICE9PSBidWZDb3JyZWN0RmxhZy5sZW5ndGgpIHtcbiAgICAgIHBhcmFub2lhLnN1Ym1pdChwYXJhbm9pYVJlcSlcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRmxhZ1xuICAgIH1cblxuICAgIGlmICghY3J5cHRvLnRpbWluZ1NhZmVFcXVhbChidWZTdWJtaXR0ZWRGbGFnLCBidWZDb3JyZWN0RmxhZykpIHtcbiAgICAgIHBhcmFub2lhLnN1Ym1pdChwYXJhbm9pYVJlcSlcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRmxhZ1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkYi5zb2x2ZXMubmV3U29sdmUoe1xuICAgICAgICBpZDogdXVpZHY0KCksXG4gICAgICAgIGNoYWxsZW5nZWlkOiBjaGFsbGVuZ2VpZCxcbiAgICAgICAgdXNlcmlkOiB1dWlkLFxuICAgICAgICBjcmVhdGVkYXQ6IG5ldyBEYXRlKClcbiAgICAgIH0pXG4gICAgICBwYXJhbm9pYVJlcS5hY2NlcHRlZCA9IHRydWVcbiAgICAgIHBhcmFub2lhLnN1Ym1pdChwYXJhbm9pYVJlcSlcblxuICAgICAgY29uc3QgeyBzY29yZSwgc29sdmVzIH0gPSAoXG4gICAgICAgIGF3YWl0IGdldENoYWxsZW5nZUluZm8oeyBpZHM6IFtjaGFsbGVuZ2VpZF0gfSlcbiAgICAgIClbMF1cbiAgICAgIGlmIChzb2x2ZXMgPT09IDApIHtcbiAgICAgICAgZGIuc3RvcmUuYWRkQ2hpcHModXVpZCwgc2NvcmUgKyAxNTApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYi5zdG9yZS5hZGRDaGlwcyh1dWlkLCBzY29yZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZXMuZ29vZEZsYWdcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5jb25zdHJhaW50ID09PSAndXEnKSB7XG4gICAgICAgIC8vIG5vdCBhIHVuaXF1ZSBzdWJtaXNzaW9uLCBzbyB0aGUgdXNlciBhbHJlYWR5IHNvbHZlZFxuICAgICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZEFscmVhZHlTb2x2ZWRDaGFsbGVuZ2VcbiAgICAgIH1cbiAgICAgIGlmIChlLmNvbnN0cmFpbnQgPT09ICd1dWlkX2ZrZXknKSB7XG4gICAgICAgIC8vIHRoZSB1c2VyIHJlZmVyZW5jZWQgYnkgdGhlIHNvbHZlIGlzbnQgaW4gdGhlIHVzZXJzIHRhYmxlXG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkVW5rbm93blVzZXJcbiAgICAgIH1cbiAgICAgIHRocm93IGVcbiAgICB9XG4gIH1cbn1cbiJdfQ==