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
const got_1 = __importDefault(require("got"));
const responses_1 = require("../../../responses");
const auth = __importStar(require("../../../auth"));
const server_1 = __importDefault(require("../../../config/server"));
const tokenEndpoint = 'https://oauth.ctftime.org/token';
const userEndpoint = 'https://oauth.ctftime.org/user';
exports.default = {
    method: 'POST',
    path: '/integrations/ctftime/callback',
    requireAuth: false,
    schema: {
        body: {
            type: 'object',
            properties: {
                ctftimeCode: {
                    type: 'string'
                }
            },
            required: ['ctftimeCode']
        }
    },
    handler: async ({ req }) => {
        if (!server_1.default.ctftime) {
            return responses_1.responses.badEndpoint;
        }
        let tokenBody;
        try {
            ({ body: tokenBody } = await got_1.default({
                url: tokenEndpoint,
                method: 'POST',
                responseType: 'json',
                form: {
                    client_id: server_1.default.ctftime.clientId,
                    client_secret: server_1.default.ctftime.clientSecret,
                    code: req.body.ctftimeCode
                }
            }));
        }
        catch (e) {
            if (e instanceof got_1.default.HTTPError && e.response.statusCode === 401) {
                return responses_1.responses.badCtftimeCode;
            }
            throw e;
        }
        const { body: userBody } = await got_1.default({
            url: userEndpoint,
            responseType: 'json',
            headers: {
                authorization: `Bearer ${tokenBody.access_token}`
            }
        });
        if (userBody.team === undefined) {
            return responses_1.responses.badCtftimeCode;
        }
        const token = await auth.token.getToken(auth.token.tokenKinds.ctftimeAuth, {
            name: userBody.team.name,
            ctftimeId: userBody.team.id
        });
        return [responses_1.responses.goodCtftimeToken, {
                ctftimeToken: token,
                ctftimeName: userBody.team.name,
                ctftimeId: userBody.team.id
            }];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbGJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL2ludGVncmF0aW9ucy9jdGZ0aW1lL2NhbGxiYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUFxQjtBQUNyQixrREFBOEM7QUFDOUMsb0RBQXFDO0FBQ3JDLG9FQUEyQztBQUUzQyxNQUFNLGFBQWEsR0FBRyxpQ0FBaUMsQ0FBQTtBQUN2RCxNQUFNLFlBQVksR0FBRyxnQ0FBZ0MsQ0FBQTtBQUVyRCxrQkFBZTtJQUNiLE1BQU0sRUFBRSxNQUFNO0lBQ2QsSUFBSSxFQUFFLGdDQUFnQztJQUN0QyxXQUFXLEVBQUUsS0FBSztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUMxQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDekIsSUFBSSxDQUFDLGdCQUFNLENBQUMsT0FBTyxFQUFFO1lBQ25CLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUE7U0FDN0I7UUFDRCxJQUFJLFNBQVMsQ0FBQTtRQUNiLElBQUk7WUFDRixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDO2dCQUMvQixHQUFHLEVBQUUsYUFBYTtnQkFDbEIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsWUFBWSxFQUFFLE1BQU07Z0JBQ3BCLElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUTtvQkFDbEMsYUFBYSxFQUFFLGdCQUFNLENBQUMsT0FBTyxDQUFDLFlBQVk7b0JBQzFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVc7aUJBQzNCO2FBQ0YsQ0FBQyxDQUFDLENBQUE7U0FDSjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksYUFBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7Z0JBQy9ELE9BQU8scUJBQVMsQ0FBQyxjQUFjLENBQUE7YUFDaEM7WUFDRCxNQUFNLENBQUMsQ0FBQTtTQUNSO1FBQ0QsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLGFBQUcsQ0FBQztZQUNuQyxHQUFHLEVBQUUsWUFBWTtZQUNqQixZQUFZLEVBQUUsTUFBTTtZQUNwQixPQUFPLEVBQUU7Z0JBQ1AsYUFBYSxFQUFFLFVBQVUsU0FBUyxDQUFDLFlBQVksRUFBRTthQUNsRDtTQUNGLENBQUMsQ0FBQTtRQUNGLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDL0IsT0FBTyxxQkFBUyxDQUFDLGNBQWMsQ0FBQTtTQUNoQztRQUNELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3pFLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUk7WUFDeEIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUM1QixDQUFDLENBQUE7UUFDRixPQUFPLENBQUMscUJBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDbEMsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLFdBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQy9CLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7YUFDNUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ290IGZyb20gJ2dvdCdcbmltcG9ydCB7IHJlc3BvbnNlcyB9IGZyb20gJy4uLy4uLy4uL3Jlc3BvbnNlcydcbmltcG9ydCAqIGFzIGF1dGggZnJvbSAnLi4vLi4vLi4vYXV0aCdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnL3NlcnZlcidcblxuY29uc3QgdG9rZW5FbmRwb2ludCA9ICdodHRwczovL29hdXRoLmN0ZnRpbWUub3JnL3Rva2VuJ1xuY29uc3QgdXNlckVuZHBvaW50ID0gJ2h0dHBzOi8vb2F1dGguY3RmdGltZS5vcmcvdXNlcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdQT1NUJyxcbiAgcGF0aDogJy9pbnRlZ3JhdGlvbnMvY3RmdGltZS9jYWxsYmFjaycsXG4gIHJlcXVpcmVBdXRoOiBmYWxzZSxcbiAgc2NoZW1hOiB7XG4gICAgYm9keToge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGN0ZnRpbWVDb2RlOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbJ2N0ZnRpbWVDb2RlJ11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgaWYgKCFjb25maWcuY3RmdGltZSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRFbmRwb2ludFxuICAgIH1cbiAgICBsZXQgdG9rZW5Cb2R5XG4gICAgdHJ5IHtcbiAgICAgICh7IGJvZHk6IHRva2VuQm9keSB9ID0gYXdhaXQgZ290KHtcbiAgICAgICAgdXJsOiB0b2tlbkVuZHBvaW50LFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIGZvcm06IHtcbiAgICAgICAgICBjbGllbnRfaWQ6IGNvbmZpZy5jdGZ0aW1lLmNsaWVudElkLFxuICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGNvbmZpZy5jdGZ0aW1lLmNsaWVudFNlY3JldCxcbiAgICAgICAgICBjb2RlOiByZXEuYm9keS5jdGZ0aW1lQ29kZVxuICAgICAgICB9XG4gICAgICB9KSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIGdvdC5IVFRQRXJyb3IgJiYgZS5yZXNwb25zZS5zdGF0dXNDb2RlID09PSA0MDEpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRDdGZ0aW1lQ29kZVxuICAgICAgfVxuICAgICAgdGhyb3cgZVxuICAgIH1cbiAgICBjb25zdCB7IGJvZHk6IHVzZXJCb2R5IH0gPSBhd2FpdCBnb3Qoe1xuICAgICAgdXJsOiB1c2VyRW5kcG9pbnQsXG4gICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgYXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VuQm9keS5hY2Nlc3NfdG9rZW59YFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHVzZXJCb2R5LnRlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRDdGZ0aW1lQ29kZVxuICAgIH1cbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGF1dGgudG9rZW4uZ2V0VG9rZW4oYXV0aC50b2tlbi50b2tlbktpbmRzLmN0ZnRpbWVBdXRoLCB7XG4gICAgICBuYW1lOiB1c2VyQm9keS50ZWFtLm5hbWUsXG4gICAgICBjdGZ0aW1lSWQ6IHVzZXJCb2R5LnRlYW0uaWRcbiAgICB9KVxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RDdGZ0aW1lVG9rZW4sIHtcbiAgICAgIGN0ZnRpbWVUb2tlbjogdG9rZW4sXG4gICAgICBjdGZ0aW1lTmFtZTogdXNlckJvZHkudGVhbS5uYW1lLFxuICAgICAgY3RmdGltZUlkOiB1c2VyQm9keS50ZWFtLmlkXG4gICAgfV1cbiAgfVxufVxuIl19