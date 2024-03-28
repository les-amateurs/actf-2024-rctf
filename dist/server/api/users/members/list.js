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
    method: 'GET',
    path: '/users/me/members',
    requireAuth: true,
    handler: async ({ user }) => {
        if (!server_1.default.userMembers) {
            return responses_1.responses.badEndpoint;
        }
        const members = await database.members.getMembers({
            userid: user.id
        });
        return [responses_1.responses.goodMemberData, members];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NlcnZlci9hcGkvdXNlcnMvbWVtYmVycy9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUE2QztBQUM3QyxrREFBOEM7QUFDOUMsb0VBQTJDO0FBRTNDLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLEtBQUs7SUFDYixJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzFCLElBQUksQ0FBQyxnQkFBTSxDQUFDLFdBQVcsRUFBRTtZQUN2QixPQUFPLHFCQUFTLENBQUMsV0FBVyxDQUFBO1NBQzdCO1FBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNoRCxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDaEIsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLHFCQUFTLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzVDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZGF0YWJhc2UgZnJvbSAnLi4vLi4vLi4vZGF0YWJhc2UnXG5pbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZy9zZXJ2ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgcGF0aDogJy91c2Vycy9tZS9tZW1iZXJzJyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIGhhbmRsZXI6IGFzeW5jICh7IHVzZXIgfSkgPT4ge1xuICAgIGlmICghY29uZmlnLnVzZXJNZW1iZXJzKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZEVuZHBvaW50XG4gICAgfVxuXG4gICAgY29uc3QgbWVtYmVycyA9IGF3YWl0IGRhdGFiYXNlLm1lbWJlcnMuZ2V0TWVtYmVycyh7XG4gICAgICB1c2VyaWQ6IHVzZXIuaWRcbiAgICB9KVxuXG4gICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZE1lbWJlckRhdGEsIG1lbWJlcnNdXG4gIH1cbn1cbiJdfQ==