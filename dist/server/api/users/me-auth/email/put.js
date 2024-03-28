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
const uuid_1 = require("uuid");
const email_validator_1 = __importDefault(require("email-validator"));
const server_1 = __importDefault(require("../../../../config/server"));
const responses_1 = require("../../../../responses");
const cache = __importStar(require("../../../../cache"));
const util = __importStar(require("../../../../util"));
const auth = __importStar(require("../../../../auth"));
const database = __importStar(require("../../../../database"));
const email_1 = require("../../../../email");
const recaptchaEnabled = util.recaptcha.checkProtectedAction(util.recaptcha.RecaptchaProtectedActions.setEmail);
exports.default = {
    method: 'PUT',
    path: '/users/me/auth/email',
    requireAuth: true,
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string'
                },
                recaptchaCode: {
                    type: 'string'
                }
            },
            required: ['email', ...(recaptchaEnabled ? ['recaptchaCode'] : [])]
        }
    },
    handler: async ({ req, user }) => {
        if (recaptchaEnabled && !await util.recaptcha.verifyRecaptchaCode(req.body.recaptchaCode)) {
            return responses_1.responses.badRecaptchaCode;
        }
        const email = util.normalize.normalizeEmail(req.body.email);
        if (!email_validator_1.default.validate(email)) {
            return responses_1.responses.badEmail;
        }
        if (server_1.default.email) {
            const checkUser = await database.users.getUserByEmail({
                email
            });
            if (checkUser !== undefined) {
                return responses_1.responses.badKnownEmail;
            }
            if (server_1.default.divisionACLs && !util.restrict.divisionAllowed(email, user.division)) {
                return responses_1.responses.badEmailChangeDivision;
            }
        }
        else {
            let result;
            try {
                result = await database.users.updateUser({
                    id: user.id,
                    email
                });
            }
            catch (e) {
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
        const verifyUuid = uuid_1.v4();
        await cache.login.makeLogin({ id: verifyUuid });
        const verifyToken = await auth.token.getToken(auth.token.tokenKinds.verify, {
            verifyId: verifyUuid,
            kind: 'update',
            userId: user.id,
            email,
            division: user.division
        });
        try {
            await email_1.sendVerification({
                email,
                kind: 'update',
                token: verifyToken
            });
        }
        catch (e) {
            throw new Error(e.message);
        }
        return responses_1.responses.goodVerifySent;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS91c2Vycy9tZS1hdXRoL2VtYWlsL3B1dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBbUM7QUFDbkMsc0VBQTRDO0FBQzVDLHVFQUE4QztBQUM5QyxxREFBaUQ7QUFDakQseURBQTBDO0FBQzFDLHVEQUF3QztBQUN4Qyx1REFBd0M7QUFDeEMsK0RBQWdEO0FBQ2hELDZDQUFvRDtBQUVwRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUUvRyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBSSxFQUFFLHNCQUFzQjtJQUM1QixXQUFXLEVBQUUsSUFBSTtJQUNqQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwRTtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQy9CLElBQUksZ0JBQWdCLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN6RixPQUFPLHFCQUFTLENBQUMsZ0JBQWdCLENBQUE7U0FDbEM7UUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzNELElBQUksQ0FBQyx5QkFBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQyxPQUFPLHFCQUFTLENBQUMsUUFBUSxDQUFBO1NBQzFCO1FBRUQsSUFBSSxnQkFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2dCQUNwRCxLQUFLO2FBQ04sQ0FBQyxDQUFBO1lBQ0YsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUMzQixPQUFPLHFCQUFTLENBQUMsYUFBYSxDQUFBO2FBQy9CO1lBQ0QsSUFBSSxnQkFBTSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQy9FLE9BQU8scUJBQVMsQ0FBQyxzQkFBc0IsQ0FBQTthQUN4QztTQUNGO2FBQU07WUFDTCxJQUFJLE1BQU0sQ0FBQTtZQUNWLElBQUk7Z0JBQ0YsTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7b0JBQ3ZDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDWCxLQUFLO2lCQUNOLENBQUMsQ0FBQTthQUNIO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLGlCQUFpQixFQUFFO29CQUN0QyxPQUFPLHFCQUFTLENBQUMsYUFBYSxDQUFBO2lCQUMvQjtnQkFDRCxNQUFNLENBQUMsQ0FBQTthQUNSO1lBQ0QsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUN4QixPQUFPLHFCQUFTLENBQUMsY0FBYyxDQUFBO2FBQ2hDO1lBQ0QsT0FBTyxxQkFBUyxDQUFDLFlBQVksQ0FBQTtTQUM5QjtRQUVELE1BQU0sVUFBVSxHQUFHLFNBQU0sRUFBRSxDQUFBO1FBQzNCLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtRQUMvQyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUMxRSxRQUFRLEVBQUUsVUFBVTtZQUNwQixJQUFJLEVBQUUsUUFBUTtZQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNmLEtBQUs7WUFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQyxDQUFBO1FBRUYsSUFBSTtZQUNGLE1BQU0sd0JBQWdCLENBQUM7Z0JBQ3JCLEtBQUs7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLFdBQVc7YUFDbkIsQ0FBQyxDQUFBO1NBQ0g7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQzNCO1FBRUQsT0FBTyxxQkFBUyxDQUFDLGNBQWMsQ0FBQTtJQUNqQyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXG5pbXBvcnQgZW1haWxWYWxpZGF0b3IgZnJvbSAnZW1haWwtdmFsaWRhdG9yJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi8uLi9jb25maWcvc2VydmVyJ1xuaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0ICogYXMgY2FjaGUgZnJvbSAnLi4vLi4vLi4vLi4vY2FjaGUnXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4uLy4uLy4uLy4uL3V0aWwnXG5pbXBvcnQgKiBhcyBhdXRoIGZyb20gJy4uLy4uLy4uLy4uL2F1dGgnXG5pbXBvcnQgKiBhcyBkYXRhYmFzZSBmcm9tICcuLi8uLi8uLi8uLi9kYXRhYmFzZSdcbmltcG9ydCB7IHNlbmRWZXJpZmljYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9lbWFpbCdcblxuY29uc3QgcmVjYXB0Y2hhRW5hYmxlZCA9IHV0aWwucmVjYXB0Y2hhLmNoZWNrUHJvdGVjdGVkQWN0aW9uKHV0aWwucmVjYXB0Y2hhLlJlY2FwdGNoYVByb3RlY3RlZEFjdGlvbnMuc2V0RW1haWwpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnUFVUJyxcbiAgcGF0aDogJy91c2Vycy9tZS9hdXRoL2VtYWlsJyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIHNjaGVtYToge1xuICAgIGJvZHk6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBlbWFpbDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHJlY2FwdGNoYUNvZGU6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFsnZW1haWwnLCAuLi4ocmVjYXB0Y2hhRW5hYmxlZCA/IFsncmVjYXB0Y2hhQ29kZSddIDogW10pXVxuICAgIH1cbiAgfSxcbiAgaGFuZGxlcjogYXN5bmMgKHsgcmVxLCB1c2VyIH0pID0+IHtcbiAgICBpZiAocmVjYXB0Y2hhRW5hYmxlZCAmJiAhYXdhaXQgdXRpbC5yZWNhcHRjaGEudmVyaWZ5UmVjYXB0Y2hhQ29kZShyZXEuYm9keS5yZWNhcHRjaGFDb2RlKSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRSZWNhcHRjaGFDb2RlXG4gICAgfVxuXG4gICAgY29uc3QgZW1haWwgPSB1dGlsLm5vcm1hbGl6ZS5ub3JtYWxpemVFbWFpbChyZXEuYm9keS5lbWFpbClcbiAgICBpZiAoIWVtYWlsVmFsaWRhdG9yLnZhbGlkYXRlKGVtYWlsKSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRFbWFpbFxuICAgIH1cblxuICAgIGlmIChjb25maWcuZW1haWwpIHtcbiAgICAgIGNvbnN0IGNoZWNrVXNlciA9IGF3YWl0IGRhdGFiYXNlLnVzZXJzLmdldFVzZXJCeUVtYWlsKHtcbiAgICAgICAgZW1haWxcbiAgICAgIH0pXG4gICAgICBpZiAoY2hlY2tVc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRLbm93bkVtYWlsXG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmRpdmlzaW9uQUNMcyAmJiAhdXRpbC5yZXN0cmljdC5kaXZpc2lvbkFsbG93ZWQoZW1haWwsIHVzZXIuZGl2aXNpb24pKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRW1haWxDaGFuZ2VEaXZpc2lvblxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVzdWx0XG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBhd2FpdCBkYXRhYmFzZS51c2Vycy51cGRhdGVVc2VyKHtcbiAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICBlbWFpbFxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZS5jb25zdHJhaW50ID09PSAndXNlcnNfZW1haWxfa2V5Jykge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkS25vd25FbWFpbFxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZFVua25vd25Vc2VyXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmdvb2RFbWFpbFNldFxuICAgIH1cblxuICAgIGNvbnN0IHZlcmlmeVV1aWQgPSB1dWlkdjQoKVxuICAgIGF3YWl0IGNhY2hlLmxvZ2luLm1ha2VMb2dpbih7IGlkOiB2ZXJpZnlVdWlkIH0pXG4gICAgY29uc3QgdmVyaWZ5VG9rZW4gPSBhd2FpdCBhdXRoLnRva2VuLmdldFRva2VuKGF1dGgudG9rZW4udG9rZW5LaW5kcy52ZXJpZnksIHtcbiAgICAgIHZlcmlmeUlkOiB2ZXJpZnlVdWlkLFxuICAgICAga2luZDogJ3VwZGF0ZScsXG4gICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICBlbWFpbCxcbiAgICAgIGRpdmlzaW9uOiB1c2VyLmRpdmlzaW9uXG4gICAgfSlcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzZW5kVmVyaWZpY2F0aW9uKHtcbiAgICAgICAgZW1haWwsXG4gICAgICAgIGtpbmQ6ICd1cGRhdGUnLFxuICAgICAgICB0b2tlbjogdmVyaWZ5VG9rZW5cbiAgICAgIH0pXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGUubWVzc2FnZSlcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2VzLmdvb2RWZXJpZnlTZW50XG4gIH1cbn1cbiJdfQ==