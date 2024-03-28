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
const responses_1 = require("../../responses");
const cache = __importStar(require("../../cache"));
const server_1 = __importDefault(require("../../config/server"));
exports.default = {
    method: 'GET',
    path: '/leaderboard/now',
    requireAuth: false,
    schema: {
        querystring: {
            type: 'object',
            properties: {
                limit: {
                    type: 'integer',
                    minimum: 0,
                    maximum: server_1.default.leaderboard.maxLimit
                },
                offset: {
                    type: 'integer',
                    minimum: 0,
                    maximum: server_1.default.leaderboard.maxOffset
                },
                division: {
                    type: 'string',
                    enum: Object.keys(server_1.default.divisions)
                }
            },
            required: ['limit', 'offset']
        }
    },
    handler: async ({ req }) => {
        if (Date.now() < server_1.default.startTime) {
            return responses_1.responses.badNotStarted;
        }
        const limit = req.query.limit;
        const offset = req.query.offset;
        const result = await cache.leaderboard.getRange({
            start: offset,
            end: offset + limit,
            division: req.query.division
        });
        return [responses_1.responses.goodLeaderboard, result];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9sZWFkZXJib2FyZC9ub3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTJDO0FBQzNDLG1EQUFvQztBQUNwQyxpRUFBd0M7QUFFeEMsa0JBQWU7SUFDYixNQUFNLEVBQUUsS0FBSztJQUNiLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsV0FBVyxFQUFFLEtBQUs7SUFDbEIsTUFBTSxFQUFFO1FBQ04sV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRO2lCQUNyQztnQkFDRCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLGdCQUFNLENBQUMsV0FBVyxDQUFDLFNBQVM7aUJBQ3RDO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLFNBQVMsQ0FBQztpQkFDcEM7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7U0FDOUI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQ3pCLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLGdCQUFNLENBQUMsU0FBUyxFQUFFO1lBQ2pDLE9BQU8scUJBQVMsQ0FBQyxhQUFhLENBQUE7U0FDL0I7UUFFRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQTtRQUM3QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtRQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQzlDLEtBQUssRUFBRSxNQUFNO1lBQ2IsR0FBRyxFQUFFLE1BQU0sR0FBRyxLQUFLO1lBQ25CLFFBQVEsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVE7U0FDN0IsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxDQUFDLHFCQUFTLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQzVDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0ICogYXMgY2FjaGUgZnJvbSAnLi4vLi4vY2FjaGUnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy9zZXJ2ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgcGF0aDogJy9sZWFkZXJib2FyZC9ub3cnLFxuICByZXF1aXJlQXV0aDogZmFsc2UsXG4gIHNjaGVtYToge1xuICAgIHF1ZXJ5c3RyaW5nOiB7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGltaXQ6IHtcbiAgICAgICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgbWluaW11bTogMCxcbiAgICAgICAgICBtYXhpbXVtOiBjb25maWcubGVhZGVyYm9hcmQubWF4TGltaXRcbiAgICAgICAgfSxcbiAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgIG1pbmltdW06IDAsXG4gICAgICAgICAgbWF4aW11bTogY29uZmlnLmxlYWRlcmJvYXJkLm1heE9mZnNldFxuICAgICAgICB9LFxuICAgICAgICBkaXZpc2lvbjoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIGVudW06IE9iamVjdC5rZXlzKGNvbmZpZy5kaXZpc2lvbnMpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogWydsaW1pdCcsICdvZmZzZXQnXVxuICAgIH1cbiAgfSxcbiAgaGFuZGxlcjogYXN5bmMgKHsgcmVxIH0pID0+IHtcbiAgICBpZiAoRGF0ZS5ub3coKSA8IGNvbmZpZy5zdGFydFRpbWUpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkTm90U3RhcnRlZFxuICAgIH1cblxuICAgIGNvbnN0IGxpbWl0ID0gcmVxLnF1ZXJ5LmxpbWl0XG4gICAgY29uc3Qgb2Zmc2V0ID0gcmVxLnF1ZXJ5Lm9mZnNldFxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhY2hlLmxlYWRlcmJvYXJkLmdldFJhbmdlKHtcbiAgICAgIHN0YXJ0OiBvZmZzZXQsXG4gICAgICBlbmQ6IG9mZnNldCArIGxpbWl0LFxuICAgICAgZGl2aXNpb246IHJlcS5xdWVyeS5kaXZpc2lvblxuICAgIH0pXG4gICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZExlYWRlcmJvYXJkLCByZXN1bHRdXG4gIH1cbn1cbiJdfQ==