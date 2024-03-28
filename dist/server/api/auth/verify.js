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
Object.defineProperty(exports, "__esModule", { value: true });
const auth = __importStar(require("../../auth"));
const cache = __importStar(require("../../cache"));
const database = __importStar(require("../../database"));
const responses_1 = require("../../responses");
const errors_1 = require("../../errors");
exports.default = {
    method: 'POST',
    path: '/auth/verify',
    requireAuth: false,
    schema: {
        body: {
            properties: {
                verifyToken: {
                    type: 'string'
                }
            },
            required: ['verifyToken']
        }
    },
    handler: async ({ req }) => {
        const tokenData = await auth.token.getData(auth.token.tokenKinds.verify, req.body.verifyToken);
        if (tokenData === null) {
            return responses_1.responses.badTokenVerification;
        }
        const tokenUnused = await cache.login.useLogin({ id: tokenData.verifyId });
        if (!tokenUnused) {
            return responses_1.responses.badTokenVerification;
        }
        if (tokenData.kind === 'register') {
            return auth.register.register({
                division: tokenData.division,
                email: tokenData.email,
                name: tokenData.name
            });
        }
        else if (tokenData.kind === 'recover') {
            const user = await database.users.getUserByIdAndEmail({
                id: tokenData.userId,
                email: tokenData.email
            });
            if (user === undefined) {
                return responses_1.responses.badUnknownUser;
            }
            const authToken = await auth.token.getToken(auth.token.tokenKinds.auth, user.id);
            return [responses_1.responses.goodVerify, { authToken }];
        }
        else if (tokenData.kind === 'update') {
            let result;
            try {
                result = await database.users.updateUser({
                    id: tokenData.userId,
                    email: tokenData.email,
                    division: tokenData.division
                });
            }
            catch (e) {
                if (e instanceof errors_1.DivisionACLError) {
                    return responses_1.responses.badEmailChangeDivision;
                }
                if (e.constraint === 'users_email_key') {
                    return responses_1.responses.badKnownEmail;
                }
                throw e;
            }
            if (result === undefined) {
                return responses_1.responses.badUnknownUser;
            }
            return responses_1.responses.goodEmailSet;
        }
        else {
            throw new Error('invalid tokenData.kind');
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9hdXRoL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMsbURBQW9DO0FBQ3BDLHlEQUEwQztBQUMxQywrQ0FBMkM7QUFDM0MseUNBQStDO0FBRS9DLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUsY0FBYztJQUNwQixXQUFXLEVBQUUsS0FBSztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDMUI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQ3pCLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDOUYsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3RCLE9BQU8scUJBQVMsQ0FBQyxvQkFBb0IsQ0FBQTtTQUN0QztRQUNELE1BQU0sV0FBVyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDMUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixPQUFPLHFCQUFTLENBQUMsb0JBQW9CLENBQUE7U0FDdEM7UUFFRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQzVCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUTtnQkFDNUIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO2dCQUN0QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7YUFDckIsQ0FBQyxDQUFBO1NBQ0g7YUFBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztnQkFDcEQsRUFBRSxFQUFFLFNBQVMsQ0FBQyxNQUFNO2dCQUNwQixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7YUFDdkIsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN0QixPQUFPLHFCQUFTLENBQUMsY0FBYyxDQUFBO2FBQ2hDO1lBQ0QsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2hGLE9BQU8sQ0FBQyxxQkFBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7U0FDN0M7YUFBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3RDLElBQUksTUFBTSxDQUFBO1lBQ1YsSUFBSTtnQkFDRixNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztvQkFDdkMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxNQUFNO29CQUNwQixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7b0JBQ3RCLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUTtpQkFDN0IsQ0FBQyxDQUFBO2FBQ0g7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsWUFBWSx5QkFBZ0IsRUFBRTtvQkFDakMsT0FBTyxxQkFBUyxDQUFDLHNCQUFzQixDQUFBO2lCQUN4QztnQkFDRCxJQUFJLENBQUMsQ0FBQyxVQUFVLEtBQUssaUJBQWlCLEVBQUU7b0JBQ3RDLE9BQU8scUJBQVMsQ0FBQyxhQUFhLENBQUE7aUJBQy9CO2dCQUNELE1BQU0sQ0FBQyxDQUFBO2FBQ1I7WUFDRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3hCLE9BQU8scUJBQVMsQ0FBQyxjQUFjLENBQUE7YUFDaEM7WUFDRCxPQUFPLHFCQUFTLENBQUMsWUFBWSxDQUFBO1NBQzlCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7U0FDMUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGF1dGggZnJvbSAnLi4vLi4vYXV0aCdcbmltcG9ydCAqIGFzIGNhY2hlIGZyb20gJy4uLy4uL2NhY2hlJ1xuaW1wb3J0ICogYXMgZGF0YWJhc2UgZnJvbSAnLi4vLi4vZGF0YWJhc2UnXG5pbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgeyBEaXZpc2lvbkFDTEVycm9yIH0gZnJvbSAnLi4vLi4vZXJyb3JzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ1BPU1QnLFxuICBwYXRoOiAnL2F1dGgvdmVyaWZ5JyxcbiAgcmVxdWlyZUF1dGg6IGZhbHNlLFxuICBzY2hlbWE6IHtcbiAgICBib2R5OiB7XG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHZlcmlmeVRva2VuOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbJ3ZlcmlmeVRva2VuJ11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgY29uc3QgdG9rZW5EYXRhID0gYXdhaXQgYXV0aC50b2tlbi5nZXREYXRhKGF1dGgudG9rZW4udG9rZW5LaW5kcy52ZXJpZnksIHJlcS5ib2R5LnZlcmlmeVRva2VuKVxuICAgIGlmICh0b2tlbkRhdGEgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkVG9rZW5WZXJpZmljYXRpb25cbiAgICB9XG4gICAgY29uc3QgdG9rZW5VbnVzZWQgPSBhd2FpdCBjYWNoZS5sb2dpbi51c2VMb2dpbih7IGlkOiB0b2tlbkRhdGEudmVyaWZ5SWQgfSlcbiAgICBpZiAoIXRva2VuVW51c2VkKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZFRva2VuVmVyaWZpY2F0aW9uXG4gICAgfVxuXG4gICAgaWYgKHRva2VuRGF0YS5raW5kID09PSAncmVnaXN0ZXInKSB7XG4gICAgICByZXR1cm4gYXV0aC5yZWdpc3Rlci5yZWdpc3Rlcih7XG4gICAgICAgIGRpdmlzaW9uOiB0b2tlbkRhdGEuZGl2aXNpb24sXG4gICAgICAgIGVtYWlsOiB0b2tlbkRhdGEuZW1haWwsXG4gICAgICAgIG5hbWU6IHRva2VuRGF0YS5uYW1lXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodG9rZW5EYXRhLmtpbmQgPT09ICdyZWNvdmVyJykge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGRhdGFiYXNlLnVzZXJzLmdldFVzZXJCeUlkQW5kRW1haWwoe1xuICAgICAgICBpZDogdG9rZW5EYXRhLnVzZXJJZCxcbiAgICAgICAgZW1haWw6IHRva2VuRGF0YS5lbWFpbFxuICAgICAgfSlcbiAgICAgIGlmICh1c2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRVbmtub3duVXNlclxuICAgICAgfVxuICAgICAgY29uc3QgYXV0aFRva2VuID0gYXdhaXQgYXV0aC50b2tlbi5nZXRUb2tlbihhdXRoLnRva2VuLnRva2VuS2luZHMuYXV0aCwgdXNlci5pZClcbiAgICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RWZXJpZnksIHsgYXV0aFRva2VuIH1dXG4gICAgfSBlbHNlIGlmICh0b2tlbkRhdGEua2luZCA9PT0gJ3VwZGF0ZScpIHtcbiAgICAgIGxldCByZXN1bHRcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IGRhdGFiYXNlLnVzZXJzLnVwZGF0ZVVzZXIoe1xuICAgICAgICAgIGlkOiB0b2tlbkRhdGEudXNlcklkLFxuICAgICAgICAgIGVtYWlsOiB0b2tlbkRhdGEuZW1haWwsXG4gICAgICAgICAgZGl2aXNpb246IHRva2VuRGF0YS5kaXZpc2lvblxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIERpdmlzaW9uQUNMRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZEVtYWlsQ2hhbmdlRGl2aXNpb25cbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5jb25zdHJhaW50ID09PSAndXNlcnNfZW1haWxfa2V5Jykge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkS25vd25FbWFpbFxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZFVua25vd25Vc2VyXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmdvb2RFbWFpbFNldFxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdG9rZW5EYXRhLmtpbmQnKVxuICAgIH1cbiAgfVxufVxuIl19