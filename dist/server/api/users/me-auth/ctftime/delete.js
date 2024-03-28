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
    path: '/users/me/auth/ctftime',
    requireAuth: true,
    handler: async ({ user }) => {
        if (!server_1.default.ctftime) {
            return responses_1.responses.badEndpoint;
        }
        let result;
        try {
            result = await database.users.removeCtftimeId({ id: user.id });
        }
        catch (e) {
            if (e.constraint === 'require_email_or_ctftime_id') {
                return responses_1.responses.badZeroAuth;
            }
            throw e;
        }
        if (result === undefined) {
            return responses_1.responses.badCtftimeNoExists;
        }
        return responses_1.responses.goodCtftimeRemoved;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS91c2Vycy9tZS1hdXRoL2N0ZnRpbWUvZGVsZXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUE4QztBQUM5QyxxREFBaUQ7QUFDakQsK0RBQWdEO0FBRWhELGtCQUFlO0lBQ2IsTUFBTSxFQUFFLFFBQVE7SUFDaEIsSUFBSSxFQUFFLHdCQUF3QjtJQUM5QixXQUFXLEVBQUUsSUFBSTtJQUNqQixPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUMxQixJQUFJLENBQUMsZ0JBQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbkIsT0FBTyxxQkFBUyxDQUFDLFdBQVcsQ0FBQTtTQUM3QjtRQUNELElBQUksTUFBTSxDQUFBO1FBQ1YsSUFBSTtZQUNGLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1NBQy9EO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxVQUFVLEtBQUssNkJBQTZCLEVBQUU7Z0JBQ2xELE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUE7YUFDN0I7WUFDRCxNQUFNLENBQUMsQ0FBQTtTQUNSO1FBQ0QsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLE9BQU8scUJBQVMsQ0FBQyxrQkFBa0IsQ0FBQTtTQUNwQztRQUNELE9BQU8scUJBQVMsQ0FBQyxrQkFBa0IsQ0FBQTtJQUNyQyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vLi4vY29uZmlnL3NlcnZlcidcbmltcG9ydCB7IHJlc3BvbnNlcyB9IGZyb20gJy4uLy4uLy4uLy4uL3Jlc3BvbnNlcydcbmltcG9ydCAqIGFzIGRhdGFiYXNlIGZyb20gJy4uLy4uLy4uLy4uL2RhdGFiYXNlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ0RFTEVURScsXG4gIHBhdGg6ICcvdXNlcnMvbWUvYXV0aC9jdGZ0aW1lJyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIGhhbmRsZXI6IGFzeW5jICh7IHVzZXIgfSkgPT4ge1xuICAgIGlmICghY29uZmlnLmN0ZnRpbWUpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRW5kcG9pbnRcbiAgICB9XG4gICAgbGV0IHJlc3VsdFxuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBkYXRhYmFzZS51c2Vycy5yZW1vdmVDdGZ0aW1lSWQoeyBpZDogdXNlci5pZCB9KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLmNvbnN0cmFpbnQgPT09ICdyZXF1aXJlX2VtYWlsX29yX2N0ZnRpbWVfaWQnKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkWmVyb0F1dGhcbiAgICAgIH1cbiAgICAgIHRocm93IGVcbiAgICB9XG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZEN0ZnRpbWVOb0V4aXN0c1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VzLmdvb2RDdGZ0aW1lUmVtb3ZlZFxuICB9XG59XG4iXX0=