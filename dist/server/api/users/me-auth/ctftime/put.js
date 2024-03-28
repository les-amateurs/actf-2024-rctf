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
const auth = __importStar(require("../../../../auth"));
exports.default = {
    method: 'PUT',
    path: '/users/me/auth/ctftime',
    requireAuth: true,
    schema: {
        body: {
            type: 'object',
            properties: {
                ctftimeToken: {
                    type: 'string'
                }
            },
            required: ['ctftimeToken']
        }
    },
    handler: async ({ req, user }) => {
        if (!server_1.default.ctftime) {
            return responses_1.responses.badEndpoint;
        }
        const ctftimeData = await auth.token.getData(auth.token.tokenKinds.ctftimeAuth, req.body.ctftimeToken);
        if (ctftimeData === null) {
            return responses_1.responses.badCtftimeToken;
        }
        let result;
        try {
            result = await database.users.updateUser({
                id: user.id,
                ctftimeId: ctftimeData.ctftimeId
            });
        }
        catch (e) {
            if (e.constraint === 'users_ctftime_id_key') {
                return responses_1.responses.badKnownCtftimeId;
            }
            throw e;
        }
        if (result === undefined) {
            return responses_1.responses.badUnknownUser;
        }
        return responses_1.responses.goodCtftimeAuthSet;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS91c2Vycy9tZS1hdXRoL2N0ZnRpbWUvcHV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUE4QztBQUM5QyxxREFBaUQ7QUFDakQsK0RBQWdEO0FBQ2hELHVEQUF3QztBQUV4QyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBSSxFQUFFLHdCQUF3QjtJQUM5QixXQUFXLEVBQUUsSUFBSTtJQUNqQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQztTQUMzQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxnQkFBTSxDQUFDLE9BQU8sRUFBRTtZQUNuQixPQUFPLHFCQUFTLENBQUMsV0FBVyxDQUFBO1NBQzdCO1FBQ0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUN0RyxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDeEIsT0FBTyxxQkFBUyxDQUFDLGVBQWUsQ0FBQTtTQUNqQztRQUNELElBQUksTUFBTSxDQUFBO1FBQ1YsSUFBSTtZQUNGLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTO2FBQ2pDLENBQUMsQ0FBQTtTQUNIO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxVQUFVLEtBQUssc0JBQXNCLEVBQUU7Z0JBQzNDLE9BQU8scUJBQVMsQ0FBQyxpQkFBaUIsQ0FBQTthQUNuQztZQUNELE1BQU0sQ0FBQyxDQUFBO1NBQ1I7UUFDRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsT0FBTyxxQkFBUyxDQUFDLGNBQWMsQ0FBQTtTQUNoQztRQUNELE9BQU8scUJBQVMsQ0FBQyxrQkFBa0IsQ0FBQTtJQUNyQyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vLi4vY29uZmlnL3NlcnZlcidcbmltcG9ydCB7IHJlc3BvbnNlcyB9IGZyb20gJy4uLy4uLy4uLy4uL3Jlc3BvbnNlcydcbmltcG9ydCAqIGFzIGRhdGFiYXNlIGZyb20gJy4uLy4uLy4uLy4uL2RhdGFiYXNlJ1xuaW1wb3J0ICogYXMgYXV0aCBmcm9tICcuLi8uLi8uLi8uLi9hdXRoJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ1BVVCcsXG4gIHBhdGg6ICcvdXNlcnMvbWUvYXV0aC9jdGZ0aW1lJyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIHNjaGVtYToge1xuICAgIGJvZHk6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBjdGZ0aW1lVG9rZW46IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFsnY3RmdGltZVRva2VuJ11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSwgdXNlciB9KSA9PiB7XG4gICAgaWYgKCFjb25maWcuY3RmdGltZSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRFbmRwb2ludFxuICAgIH1cbiAgICBjb25zdCBjdGZ0aW1lRGF0YSA9IGF3YWl0IGF1dGgudG9rZW4uZ2V0RGF0YShhdXRoLnRva2VuLnRva2VuS2luZHMuY3RmdGltZUF1dGgsIHJlcS5ib2R5LmN0ZnRpbWVUb2tlbilcbiAgICBpZiAoY3RmdGltZURhdGEgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkQ3RmdGltZVRva2VuXG4gICAgfVxuICAgIGxldCByZXN1bHRcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgZGF0YWJhc2UudXNlcnMudXBkYXRlVXNlcih7XG4gICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICBjdGZ0aW1lSWQ6IGN0ZnRpbWVEYXRhLmN0ZnRpbWVJZFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5jb25zdHJhaW50ID09PSAndXNlcnNfY3RmdGltZV9pZF9rZXknKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkS25vd25DdGZ0aW1lSWRcbiAgICAgIH1cbiAgICAgIHRocm93IGVcbiAgICB9XG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZFVua25vd25Vc2VyXG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZXMuZ29vZEN0ZnRpbWVBdXRoU2V0XG4gIH1cbn1cbiJdfQ==