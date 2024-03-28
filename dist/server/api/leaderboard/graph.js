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
    path: '/leaderboard/graph',
    requireAuth: false,
    schema: {
        querystring: {
            type: 'object',
            properties: {
                division: {
                    type: 'string',
                    enum: Object.keys(server_1.default.divisions)
                },
                limit: {
                    type: 'integer',
                    minimum: 1,
                    maximum: server_1.default.leaderboard.graphMaxTeams
                }
            },
            required: ['limit']
        }
    },
    handler: async ({ req }) => {
        if (Date.now() < server_1.default.startTime) {
            return responses_1.responses.badNotStarted;
        }
        const division = req.query.division;
        const limit = req.query.limit;
        const graph = await cache.leaderboard.getGraph({
            division,
            maxTeams: limit
        });
        const reducedGraph = graph.map((user) => {
            const { points } = user;
            const reducedPoints = [];
            points.forEach((point, i) => {
                const prev = points[i - 1];
                const next = points[i + 1];
                if (prev && next && prev.score === point.score && next.score === point.score) {
                    return;
                }
                reducedPoints.push(point);
            });
            return {
                ...user,
                points: reducedPoints
            };
        });
        return [responses_1.responses.goodLeaderboard, {
                graph: reducedGraph
            }];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL2xlYWRlcmJvYXJkL2dyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEyQztBQUMzQyxtREFBb0M7QUFDcEMsaUVBQXdDO0FBRXhDLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLEtBQUs7SUFDYixJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLFNBQVMsQ0FBQztpQkFDcEM7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhO2lCQUMxQzthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ3BCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUN6QixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxnQkFBTSxDQUFDLFNBQVMsRUFBRTtZQUNqQyxPQUFPLHFCQUFTLENBQUMsYUFBYSxDQUFBO1NBQy9CO1FBRUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUE7UUFDbkMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7UUFDN0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUM3QyxRQUFRO1lBQ1IsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUE7WUFDdkIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFBO1lBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzFCLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUM1RSxPQUFNO2lCQUNQO2dCQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDM0IsQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFPO2dCQUNMLEdBQUcsSUFBSTtnQkFDUCxNQUFNLEVBQUUsYUFBYTthQUN0QixDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLENBQUMscUJBQVMsQ0FBQyxlQUFlLEVBQUU7Z0JBQ2pDLEtBQUssRUFBRSxZQUFZO2FBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0ICogYXMgY2FjaGUgZnJvbSAnLi4vLi4vY2FjaGUnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy9zZXJ2ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgcGF0aDogJy9sZWFkZXJib2FyZC9ncmFwaCcsXG4gIHJlcXVpcmVBdXRoOiBmYWxzZSxcbiAgc2NoZW1hOiB7XG4gICAgcXVlcnlzdHJpbmc6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkaXZpc2lvbjoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIGVudW06IE9iamVjdC5rZXlzKGNvbmZpZy5kaXZpc2lvbnMpXG4gICAgICAgIH0sXG4gICAgICAgIGxpbWl0OiB7XG4gICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgIG1pbmltdW06IDEsXG4gICAgICAgICAgbWF4aW11bTogY29uZmlnLmxlYWRlcmJvYXJkLmdyYXBoTWF4VGVhbXNcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbJ2xpbWl0J11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgaWYgKERhdGUubm93KCkgPCBjb25maWcuc3RhcnRUaW1lKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZE5vdFN0YXJ0ZWRcbiAgICB9XG5cbiAgICBjb25zdCBkaXZpc2lvbiA9IHJlcS5xdWVyeS5kaXZpc2lvblxuICAgIGNvbnN0IGxpbWl0ID0gcmVxLnF1ZXJ5LmxpbWl0XG4gICAgY29uc3QgZ3JhcGggPSBhd2FpdCBjYWNoZS5sZWFkZXJib2FyZC5nZXRHcmFwaCh7XG4gICAgICBkaXZpc2lvbixcbiAgICAgIG1heFRlYW1zOiBsaW1pdFxuICAgIH0pXG4gICAgY29uc3QgcmVkdWNlZEdyYXBoID0gZ3JhcGgubWFwKCh1c2VyKSA9PiB7XG4gICAgICBjb25zdCB7IHBvaW50cyB9ID0gdXNlclxuICAgICAgY29uc3QgcmVkdWNlZFBvaW50cyA9IFtdXG4gICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQsIGkpID0+IHtcbiAgICAgICAgY29uc3QgcHJldiA9IHBvaW50c1tpIC0gMV1cbiAgICAgICAgY29uc3QgbmV4dCA9IHBvaW50c1tpICsgMV1cbiAgICAgICAgaWYgKHByZXYgJiYgbmV4dCAmJiBwcmV2LnNjb3JlID09PSBwb2ludC5zY29yZSAmJiBuZXh0LnNjb3JlID09PSBwb2ludC5zY29yZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHJlZHVjZWRQb2ludHMucHVzaChwb2ludClcbiAgICAgIH0pXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi51c2VyLFxuICAgICAgICBwb2ludHM6IHJlZHVjZWRQb2ludHNcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RMZWFkZXJib2FyZCwge1xuICAgICAgZ3JhcGg6IHJlZHVjZWRHcmFwaFxuICAgIH1dXG4gIH1cbn1cbiJdfQ==