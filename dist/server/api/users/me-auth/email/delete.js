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
const server_1 = __importDefault(require("../../../../config/server"));
const responses_1 = require("../../../../responses");
const database = __importStar(require("../../../../database"));
exports.default = {
    method: 'DELETE',
    path: '/users/me/auth/email',
    requireAuth: true,
    handler: async ({ user }) => {
        if (!server_1.default.email) {
            return responses_1.responses.badEndpoint;
        }
        let result;
        try {
            result = await database.users.removeEmail({ id: user.id });
        }
        catch (e) {
            if (e.constraint === 'require_email_or_ctftime_id') {
                return responses_1.responses.badZeroAuth;
            }
            throw e;
        }
        if (result === undefined) {
            return responses_1.responses.badEmailNoExists;
        }
        return responses_1.responses.goodEmailRemoved;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS91c2Vycy9tZS1hdXRoL2VtYWlsL2RlbGV0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBOEM7QUFDOUMscURBQWlEO0FBQ2pELCtEQUFnRDtBQUVoRCxrQkFBZTtJQUNiLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLElBQUksRUFBRSxzQkFBc0I7SUFDNUIsV0FBVyxFQUFFLElBQUk7SUFDakIsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDMUIsSUFBSSxDQUFDLGdCQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUE7U0FDN0I7UUFDRCxJQUFJLE1BQU0sQ0FBQTtRQUNWLElBQUk7WUFDRixNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtTQUMzRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLDZCQUE2QixFQUFFO2dCQUNsRCxPQUFPLHFCQUFTLENBQUMsV0FBVyxDQUFBO2FBQzdCO1lBQ0QsTUFBTSxDQUFDLENBQUE7U0FDUjtRQUNELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixPQUFPLHFCQUFTLENBQUMsZ0JBQWdCLENBQUE7U0FDbEM7UUFDRCxPQUFPLHFCQUFTLENBQUMsZ0JBQWdCLENBQUE7SUFDbkMsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uLy4uL2NvbmZpZy9zZXJ2ZXInXG5pbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi8uLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgKiBhcyBkYXRhYmFzZSBmcm9tICcuLi8uLi8uLi8uLi9kYXRhYmFzZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdERUxFVEUnLFxuICBwYXRoOiAnL3VzZXJzL21lL2F1dGgvZW1haWwnLFxuICByZXF1aXJlQXV0aDogdHJ1ZSxcbiAgaGFuZGxlcjogYXN5bmMgKHsgdXNlciB9KSA9PiB7XG4gICAgaWYgKCFjb25maWcuZW1haWwpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRW5kcG9pbnRcbiAgICB9XG4gICAgbGV0IHJlc3VsdFxuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBkYXRhYmFzZS51c2Vycy5yZW1vdmVFbWFpbCh7IGlkOiB1c2VyLmlkIH0pXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUuY29uc3RyYWludCA9PT0gJ3JlcXVpcmVfZW1haWxfb3JfY3RmdGltZV9pZCcpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRaZXJvQXV0aFxuICAgICAgfVxuICAgICAgdGhyb3cgZVxuICAgIH1cbiAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRW1haWxOb0V4aXN0c1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VzLmdvb2RFbWFpbFJlbW92ZWRcbiAgfVxufVxuIl19