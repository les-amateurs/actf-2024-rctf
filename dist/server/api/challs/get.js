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
const server_1 = __importDefault(require("../../config/server"));
const challenges = __importStar(require("../../challenges"));
const responses_1 = require("../../responses");
const leaderboard_1 = require("../../cache/leaderboard");
const paranoia = __importStar(require("../../paranoia"));
exports.default = {
    method: 'GET',
    path: '/challs',
    requireAuth: true,
    handler: async ({ req, user }) => {
        const uuid = user.id;
        if (Date.now() < server_1.default.startTime) {
            return responses_1.responses.badNotStarted;
        }
        const cleaned = challenges.getCleanedChallenges();
        const challengeInfo = await leaderboard_1.getChallengeInfo({
            ids: cleaned.map(chall => chall.id)
        });
        await paranoia.visit(uuid, req.ip, req.headers['user-agent']);
        return [responses_1.responses.goodChallenges, cleaned.map((chall, i) => ({
                ...chall,
                points: challengeInfo[i].score,
                solves: challengeInfo[i].solves
            }))];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9jaGFsbHMvZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUF3QztBQUN4Qyw2REFBOEM7QUFDOUMsK0NBQTJDO0FBQzNDLHlEQUEwRDtBQUMxRCx5REFBMEM7QUFFMUMsa0JBQWU7SUFDYixNQUFNLEVBQUUsS0FBSztJQUNiLElBQUksRUFBRSxTQUFTO0lBQ2YsV0FBVyxFQUFFLElBQUk7SUFDakIsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUE7UUFFcEIsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxTQUFTLEVBQUU7WUFDakMsT0FBTyxxQkFBUyxDQUFDLGFBQWEsQ0FBQTtTQUMvQjtRQUVELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFBO1FBQ2pELE1BQU0sYUFBYSxHQUFHLE1BQU0sOEJBQWdCLENBQUM7WUFDM0MsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ3BDLENBQUMsQ0FBQTtRQUVGLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7UUFFN0QsT0FBTyxDQUFDLHFCQUFTLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRCxHQUFHLEtBQUs7Z0JBQ1IsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO2dCQUM5QixNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07YUFDaEMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvc2VydmVyJ1xuaW1wb3J0ICogYXMgY2hhbGxlbmdlcyBmcm9tICcuLi8uLi9jaGFsbGVuZ2VzJ1xuaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0IHsgZ2V0Q2hhbGxlbmdlSW5mbyB9IGZyb20gJy4uLy4uL2NhY2hlL2xlYWRlcmJvYXJkJ1xuaW1wb3J0ICogYXMgcGFyYW5vaWEgZnJvbSAnLi4vLi4vcGFyYW5vaWEnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgcGF0aDogJy9jaGFsbHMnLFxuICByZXF1aXJlQXV0aDogdHJ1ZSxcbiAgaGFuZGxlcjogYXN5bmMgKHsgcmVxLCB1c2VyIH0pID0+IHtcbiAgICBjb25zdCB1dWlkID0gdXNlci5pZFxuXG4gICAgaWYgKERhdGUubm93KCkgPCBjb25maWcuc3RhcnRUaW1lKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZE5vdFN0YXJ0ZWRcbiAgICB9XG5cbiAgICBjb25zdCBjbGVhbmVkID0gY2hhbGxlbmdlcy5nZXRDbGVhbmVkQ2hhbGxlbmdlcygpXG4gICAgY29uc3QgY2hhbGxlbmdlSW5mbyA9IGF3YWl0IGdldENoYWxsZW5nZUluZm8oe1xuICAgICAgaWRzOiBjbGVhbmVkLm1hcChjaGFsbCA9PiBjaGFsbC5pZClcbiAgICB9KVxuXG4gICAgYXdhaXQgcGFyYW5vaWEudmlzaXQodXVpZCwgcmVxLmlwLCByZXEuaGVhZGVyc1sndXNlci1hZ2VudCddKVxuXG4gICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZENoYWxsZW5nZXMsIGNsZWFuZWQubWFwKChjaGFsbCwgaSkgPT4gKHtcbiAgICAgIC4uLmNoYWxsLFxuICAgICAgcG9pbnRzOiBjaGFsbGVuZ2VJbmZvW2ldLnNjb3JlLFxuICAgICAgc29sdmVzOiBjaGFsbGVuZ2VJbmZvW2ldLnNvbHZlc1xuICAgIH0pKV1cbiAgfVxufVxuIl19