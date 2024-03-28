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
const database = __importStar(require("../../../database"));
const responses_1 = require("../../../responses");
const server_1 = __importDefault(require("../../../config/server"));
exports.default = {
    method: 'DELETE',
    path: '/users/me/members/:id',
    requireAuth: true,
    schema: {
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
        if (!server_1.default.userMembers) {
            return responses_1.responses.badEndpoint;
        }
        await database.members.removeMember({
            id: req.params.id,
            userid: user.id
        });
        return responses_1.responses.goodMemberDelete;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS91c2Vycy9tZW1iZXJzL2RlbGV0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBNkM7QUFDN0Msa0RBQThDO0FBQzlDLG9FQUEyQztBQUUzQyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLElBQUksRUFBRSx1QkFBdUI7SUFDN0IsV0FBVyxFQUFFLElBQUk7SUFDakIsTUFBTSxFQUFFO1FBQ04sTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFO29CQUNGLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDakI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUMvQixJQUFJLENBQUMsZ0JBQU0sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsT0FBTyxxQkFBUyxDQUFDLFdBQVcsQ0FBQTtTQUM3QjtRQUVELE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDbEMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDaEIsQ0FBQyxDQUFBO1FBRUYsT0FBTyxxQkFBUyxDQUFDLGdCQUFnQixDQUFBO0lBQ25DLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZGF0YWJhc2UgZnJvbSAnLi4vLi4vLi4vZGF0YWJhc2UnXG5pbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZy9zZXJ2ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnREVMRVRFJyxcbiAgcGF0aDogJy91c2Vycy9tZS9tZW1iZXJzLzppZCcsXG4gIHJlcXVpcmVBdXRoOiB0cnVlLFxuICBzY2hlbWE6IHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBpZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogWydpZCddXG4gICAgfVxuICB9LFxuICBoYW5kbGVyOiBhc3luYyAoeyByZXEsIHVzZXIgfSkgPT4ge1xuICAgIGlmICghY29uZmlnLnVzZXJNZW1iZXJzKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZEVuZHBvaW50XG4gICAgfVxuXG4gICAgYXdhaXQgZGF0YWJhc2UubWVtYmVycy5yZW1vdmVNZW1iZXIoe1xuICAgICAgaWQ6IHJlcS5wYXJhbXMuaWQsXG4gICAgICB1c2VyaWQ6IHVzZXIuaWRcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlcy5nb29kTWVtYmVyRGVsZXRlXG4gIH1cbn1cbiJdfQ==