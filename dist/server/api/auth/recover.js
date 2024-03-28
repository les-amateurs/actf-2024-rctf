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
const cache = __importStar(require("../../cache"));
const util = __importStar(require("../../util"));
const auth = __importStar(require("../../auth"));
const database = __importStar(require("../../database"));
const server_1 = __importDefault(require("../../config/server"));
const responses_1 = require("../../responses");
const email_1 = require("../../email");
const recaptchaEnabled = util.recaptcha.checkProtectedAction(util.recaptcha.RecaptchaProtectedActions.recover);
exports.default = {
    method: 'POST',
    path: '/auth/recover',
    requireAuth: false,
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
    handler: async ({ req }) => {
        if (!server_1.default.email) {
            return responses_1.responses.badEndpoint;
        }
        if (recaptchaEnabled && !await util.recaptcha.verifyRecaptchaCode(req.body.recaptchaCode)) {
            return responses_1.responses.badRecaptchaCode;
        }
        const email = util.normalize.normalizeEmail(req.body.email);
        if (!email_validator_1.default.validate(email)) {
            return responses_1.responses.badEmail;
        }
        const user = await database.users.getUserByEmail({ email });
        if (user === undefined) {
            return responses_1.responses.badUnknownEmail;
        }
        const verifyUuid = uuid_1.v4();
        await cache.login.makeLogin({ id: verifyUuid });
        const verifyToken = await auth.token.getToken(auth.token.tokenKinds.verify, {
            verifyId: verifyUuid,
            kind: 'recover',
            userId: user.id,
            email
        });
        await email_1.sendVerification({
            email,
            kind: 'recover',
            token: verifyToken
        });
        return responses_1.responses.goodVerifySent;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvYXV0aC9yZWNvdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFtQztBQUNuQyxzRUFBNEM7QUFDNUMsbURBQW9DO0FBQ3BDLGlEQUFrQztBQUNsQyxpREFBa0M7QUFDbEMseURBQTBDO0FBQzFDLGlFQUF3QztBQUN4QywrQ0FBMkM7QUFDM0MsdUNBQThDO0FBRTlDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRTlHLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUsZUFBZTtJQUNyQixXQUFXLEVBQUUsS0FBSztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwRTtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDekIsSUFBSSxDQUFDLGdCQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUE7U0FDN0I7UUFFRCxJQUFJLGdCQUFnQixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDekYsT0FBTyxxQkFBUyxDQUFDLGdCQUFnQixDQUFBO1NBQ2xDO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzRCxJQUFJLENBQUMseUJBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxxQkFBUyxDQUFDLFFBQVEsQ0FBQTtTQUMxQjtRQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQzNELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUN0QixPQUFPLHFCQUFTLENBQUMsZUFBZSxDQUFBO1NBQ2pDO1FBRUQsTUFBTSxVQUFVLEdBQUcsU0FBTSxFQUFFLENBQUE7UUFDM0IsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQzFFLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2YsS0FBSztTQUNOLENBQUMsQ0FBQTtRQUVGLE1BQU0sd0JBQWdCLENBQUM7WUFDckIsS0FBSztZQUNMLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLFdBQVc7U0FDbkIsQ0FBQyxDQUFBO1FBRUYsT0FBTyxxQkFBUyxDQUFDLGNBQWMsQ0FBQTtJQUNqQyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXG5pbXBvcnQgZW1haWxWYWxpZGF0b3IgZnJvbSAnZW1haWwtdmFsaWRhdG9yJ1xuaW1wb3J0ICogYXMgY2FjaGUgZnJvbSAnLi4vLi4vY2FjaGUnXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4uLy4uL3V0aWwnXG5pbXBvcnQgKiBhcyBhdXRoIGZyb20gJy4uLy4uL2F1dGgnXG5pbXBvcnQgKiBhcyBkYXRhYmFzZSBmcm9tICcuLi8uLi9kYXRhYmFzZSdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL3NlcnZlcidcbmltcG9ydCB7IHJlc3BvbnNlcyB9IGZyb20gJy4uLy4uL3Jlc3BvbnNlcydcbmltcG9ydCB7IHNlbmRWZXJpZmljYXRpb24gfSBmcm9tICcuLi8uLi9lbWFpbCdcblxuY29uc3QgcmVjYXB0Y2hhRW5hYmxlZCA9IHV0aWwucmVjYXB0Y2hhLmNoZWNrUHJvdGVjdGVkQWN0aW9uKHV0aWwucmVjYXB0Y2hhLlJlY2FwdGNoYVByb3RlY3RlZEFjdGlvbnMucmVjb3ZlcilcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdQT1NUJyxcbiAgcGF0aDogJy9hdXRoL3JlY292ZXInLFxuICByZXF1aXJlQXV0aDogZmFsc2UsXG4gIHNjaGVtYToge1xuICAgIGJvZHk6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBlbWFpbDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHJlY2FwdGNoYUNvZGU6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFsnZW1haWwnLCAuLi4ocmVjYXB0Y2hhRW5hYmxlZCA/IFsncmVjYXB0Y2hhQ29kZSddIDogW10pXVxuICAgIH1cbiAgfSxcbiAgaGFuZGxlcjogYXN5bmMgKHsgcmVxIH0pID0+IHtcbiAgICBpZiAoIWNvbmZpZy5lbWFpbCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRFbmRwb2ludFxuICAgIH1cblxuICAgIGlmIChyZWNhcHRjaGFFbmFibGVkICYmICFhd2FpdCB1dGlsLnJlY2FwdGNoYS52ZXJpZnlSZWNhcHRjaGFDb2RlKHJlcS5ib2R5LnJlY2FwdGNoYUNvZGUpKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZFJlY2FwdGNoYUNvZGVcbiAgICB9XG5cbiAgICBjb25zdCBlbWFpbCA9IHV0aWwubm9ybWFsaXplLm5vcm1hbGl6ZUVtYWlsKHJlcS5ib2R5LmVtYWlsKVxuICAgIGlmICghZW1haWxWYWxpZGF0b3IudmFsaWRhdGUoZW1haWwpKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZEVtYWlsXG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGRhdGFiYXNlLnVzZXJzLmdldFVzZXJCeUVtYWlsKHsgZW1haWwgfSlcbiAgICBpZiAodXNlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZFVua25vd25FbWFpbFxuICAgIH1cblxuICAgIGNvbnN0IHZlcmlmeVV1aWQgPSB1dWlkdjQoKVxuICAgIGF3YWl0IGNhY2hlLmxvZ2luLm1ha2VMb2dpbih7IGlkOiB2ZXJpZnlVdWlkIH0pXG4gICAgY29uc3QgdmVyaWZ5VG9rZW4gPSBhd2FpdCBhdXRoLnRva2VuLmdldFRva2VuKGF1dGgudG9rZW4udG9rZW5LaW5kcy52ZXJpZnksIHtcbiAgICAgIHZlcmlmeUlkOiB2ZXJpZnlVdWlkLFxuICAgICAga2luZDogJ3JlY292ZXInLFxuICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgZW1haWxcbiAgICB9KVxuXG4gICAgYXdhaXQgc2VuZFZlcmlmaWNhdGlvbih7XG4gICAgICBlbWFpbCxcbiAgICAgIGtpbmQ6ICdyZWNvdmVyJyxcbiAgICAgIHRva2VuOiB2ZXJpZnlUb2tlblxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVzcG9uc2VzLmdvb2RWZXJpZnlTZW50XG4gIH1cbn1cbiJdfQ==