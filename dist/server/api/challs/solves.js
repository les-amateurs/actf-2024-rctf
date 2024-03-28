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
const db = __importStar(require("../../database"));
const challenges = __importStar(require("../../challenges"));
const responses_1 = require("../../responses");
const server_1 = __importDefault(require("../../config/server"));
exports.default = {
    method: 'GET',
    path: '/challs/:id/solves',
    requireAuth: false,
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                }
            },
            required: ['id']
        },
        query: {
            type: 'object',
            properties: {
                limit: {
                    type: 'integer',
                    minimum: 1,
                    maximum: server_1.default.leaderboard.maxLimit
                },
                offset: {
                    type: 'integer',
                    minimum: 0,
                    maximum: server_1.default.leaderboard.maxOffset
                }
            },
            required: ['limit', 'offset']
        }
    },
    handler: async ({ req }) => {
        if (Date.now() < server_1.default.startTime) {
            return responses_1.responses.badNotStarted;
        }
        const chall = challenges.getCleanedChallenge(req.params.id);
        if (!chall) {
            return responses_1.responses.badChallenge;
        }
        const solves = await db.solves.getSolvesByChallId({
            challengeid: req.params.id,
            limit: req.query.limit,
            offset: req.query.offset
        });
        return [responses_1.responses.goodChallengeSolves, {
                solves: solves.map(solve => ({
                    id: solve.id,
                    createdAt: solve.createdat.getTime(),
                    userId: solve.userid,
                    userName: solve.name
                }))
            }];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9jaGFsbHMvc29sdmVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFvQztBQUNwQyw2REFBOEM7QUFDOUMsK0NBQTJDO0FBQzNDLGlFQUF3QztBQUV4QyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBSSxFQUFFLG9CQUFvQjtJQUMxQixXQUFXLEVBQUUsS0FBSztJQUNsQixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixFQUFFLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNqQjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsQ0FBQztvQkFDVixPQUFPLEVBQUUsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsUUFBUTtpQkFDckM7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTO2lCQUN0QzthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztTQUM5QjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDekIsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsZ0JBQU0sQ0FBQyxTQUFTLEVBQUU7WUFDakMsT0FBTyxxQkFBUyxDQUFDLGFBQWEsQ0FBQTtTQUMvQjtRQUNELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzNELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLHFCQUFTLENBQUMsWUFBWSxDQUFBO1NBQzlCO1FBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDO1lBQ2hELFdBQVcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN0QixNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQTtRQUNGLE9BQU8sQ0FBQyxxQkFBUyxDQUFDLG1CQUFtQixFQUFFO2dCQUNyQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzNCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtvQkFDWixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQ3BDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtvQkFDcEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJO2lCQUNyQixDQUFDLENBQUM7YUFDSixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRiIGZyb20gJy4uLy4uL2RhdGFiYXNlJ1xuaW1wb3J0ICogYXMgY2hhbGxlbmdlcyBmcm9tICcuLi8uLi9jaGFsbGVuZ2VzJ1xuaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvc2VydmVyJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ0dFVCcsXG4gIHBhdGg6ICcvY2hhbGxzLzppZC9zb2x2ZXMnLFxuICByZXF1aXJlQXV0aDogZmFsc2UsXG4gIHNjaGVtYToge1xuICAgIHBhcmFtczoge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbJ2lkJ11cbiAgICB9LFxuICAgIHF1ZXJ5OiB7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGltaXQ6IHtcbiAgICAgICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgbWluaW11bTogMSxcbiAgICAgICAgICBtYXhpbXVtOiBjb25maWcubGVhZGVyYm9hcmQubWF4TGltaXRcbiAgICAgICAgfSxcbiAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgIG1pbmltdW06IDAsXG4gICAgICAgICAgbWF4aW11bTogY29uZmlnLmxlYWRlcmJvYXJkLm1heE9mZnNldFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFsnbGltaXQnLCAnb2Zmc2V0J11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgaWYgKERhdGUubm93KCkgPCBjb25maWcuc3RhcnRUaW1lKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZE5vdFN0YXJ0ZWRcbiAgICB9XG4gICAgY29uc3QgY2hhbGwgPSBjaGFsbGVuZ2VzLmdldENsZWFuZWRDaGFsbGVuZ2UocmVxLnBhcmFtcy5pZClcbiAgICBpZiAoIWNoYWxsKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZENoYWxsZW5nZVxuICAgIH1cbiAgICBjb25zdCBzb2x2ZXMgPSBhd2FpdCBkYi5zb2x2ZXMuZ2V0U29sdmVzQnlDaGFsbElkKHtcbiAgICAgIGNoYWxsZW5nZWlkOiByZXEucGFyYW1zLmlkLFxuICAgICAgbGltaXQ6IHJlcS5xdWVyeS5saW1pdCxcbiAgICAgIG9mZnNldDogcmVxLnF1ZXJ5Lm9mZnNldFxuICAgIH0pXG4gICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZENoYWxsZW5nZVNvbHZlcywge1xuICAgICAgc29sdmVzOiBzb2x2ZXMubWFwKHNvbHZlID0+ICh7XG4gICAgICAgIGlkOiBzb2x2ZS5pZCxcbiAgICAgICAgY3JlYXRlZEF0OiBzb2x2ZS5jcmVhdGVkYXQuZ2V0VGltZSgpLFxuICAgICAgICB1c2VySWQ6IHNvbHZlLnVzZXJpZCxcbiAgICAgICAgdXNlck5hbWU6IHNvbHZlLm5hbWVcbiAgICAgIH0pKVxuICAgIH1dXG4gIH1cbn1cbiJdfQ==