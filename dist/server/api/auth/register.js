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
const server_1 = __importDefault(require("../../config/server"));
const responses_1 = require("../../responses");
const users_1 = require("../../database/users");
const email_1 = require("../../email");
const recaptchaEnabled = util.recaptcha.checkProtectedAction(util.recaptcha.RecaptchaProtectedActions.register);
exports.default = {
    method: 'POST',
    path: '/auth/register',
    requireAuth: false,
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string'
                },
                name: {
                    type: 'string'
                },
                ctftimeToken: {
                    type: 'string'
                },
                recaptchaCode: {
                    type: 'string'
                }
            },
            required: [...(recaptchaEnabled ? ['recaptchaCode'] : [])],
            oneOf: [{
                    required: ['email', 'name']
                }, {
                    required: ['ctftimeToken']
                }]
        }
    },
    handler: async ({ req }) => {
        const ip = req.ip;
        if (recaptchaEnabled && !await util.recaptcha.verifyRecaptchaCode(req.body.recaptchaCode)) {
            return responses_1.responses.badRecaptchaCode;
        }
        let email;
        let reqName;
        let ctftimeId;
        if (req.body.ctftimeToken !== undefined) {
            const ctftimeData = await auth.token.getData(auth.token.tokenKinds.ctftimeAuth, req.body.ctftimeToken);
            if (ctftimeData === null) {
                return responses_1.responses.badCtftimeToken;
            }
            reqName = ctftimeData.name;
            ctftimeId = ctftimeData.ctftimeId;
        }
        else {
            email = util.normalize.normalizeEmail(req.body.email);
            if (!email_validator_1.default.validate(email)) {
                return responses_1.responses.badEmail;
            }
        }
        if (req.body.name !== undefined) {
            reqName = req.body.name;
        }
        const name = util.normalize.normalizeName(reqName);
        if (!util.validate.validateName(name)) {
            return responses_1.responses.badName;
        }
        if (!server_1.default.email) {
            const division = server_1.default.defaultDivision || Object.keys(server_1.default.divisions)[0];
            return auth.register.register({
                division,
                email,
                name,
                ctftimeId
            }, ip);
        }
        const division = server_1.default.divisionACLs
            ? util.restrict.allowedDivisions(email)[0]
            : (server_1.default.defaultDivision || Object.keys(server_1.default.divisions)[0]);
        if (division === undefined) {
            return responses_1.responses.badCompetitionNotAllowed;
        }
        if (req.body.ctftimeToken !== undefined) {
            return auth.register.register({
                division,
                name,
                ctftimeId
            }, ip);
        }
        const conflictRes = await users_1.getUserByNameOrEmail({ name, email });
        if (conflictRes) {
            if (conflictRes.email === email) {
                return responses_1.responses.badKnownEmail;
            }
            return responses_1.responses.badKnownName;
        }
        const verifyUuid = uuid_1.v4();
        await cache.login.makeLogin({ id: verifyUuid });
        const verifyToken = await auth.token.getToken(auth.token.tokenKinds.verify, {
            verifyId: verifyUuid,
            kind: 'register',
            email,
            name,
            division
        });
        await email_1.sendVerification({
            email,
            kind: 'register',
            token: verifyToken
        });
        return responses_1.responses.goodVerifySent;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL2F1dGgvcmVnaXN0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQW1DO0FBQ25DLHNFQUE0QztBQUM1QyxtREFBb0M7QUFDcEMsaURBQWtDO0FBQ2xDLGlEQUFrQztBQUNsQyxpRUFBd0M7QUFDeEMsK0NBQTJDO0FBQzNDLGdEQUEyRDtBQUMzRCx1Q0FBOEM7QUFFOUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsUUFBUSxDQUFDLENBQUE7QUFFL0csa0JBQWU7SUFDYixNQUFNLEVBQUUsTUFBTTtJQUNkLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsV0FBVyxFQUFFLEtBQUs7SUFDbEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFELEtBQUssRUFBRSxDQUFDO29CQUNOLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7aUJBQzVCLEVBQUU7b0JBQ0QsUUFBUSxFQUFFLENBQUMsY0FBYyxDQUFDO2lCQUMzQixDQUFD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NEJBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUMvRCxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7Z0JBQy9CLE9BQU8scUJBQVMsQ0FBQyxhQUFhLENBQUE7YUFDL0I7WUFDRCxPQUFPLHFCQUFTLENBQUMsWUFBWSxDQUFBO1NBQzlCO1FBRUQsTUFBTSxVQUFVLEdBQUcsU0FBTSxFQUFFLENBQUE7UUFDM0IsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQzFFLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLElBQUksRUFBRSxVQUFVO1lBQ2hCLEtBQUs7WUFDTCxJQUFJO1lBQ0osUUFBUTtTQUNULENBQUMsQ0FBQTtRQUVGLE1BQU0sd0JBQWdCLENBQUM7WUFDckIsS0FBSztZQUNMLElBQUksRUFBRSxVQUFVO1lBQ2hCLEtBQUssRUFBRSxXQUFXO1NBQ25CLENBQUMsQ0FBQTtRQUVGLE9BQU8scUJBQVMsQ0FBQyxjQUFjLENBQUE7SUFDakMsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJ1xuaW1wb3J0IGVtYWlsVmFsaWRhdG9yIGZyb20gJ2VtYWlsLXZhbGlkYXRvcidcbmltcG9ydCAqIGFzIGNhY2hlIGZyb20gJy4uLy4uL2NhY2hlJ1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuLi8uLi91dGlsJ1xuaW1wb3J0ICogYXMgYXV0aCBmcm9tICcuLi8uLi9hdXRoJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvc2VydmVyJ1xuaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0IHsgZ2V0VXNlckJ5TmFtZU9yRW1haWwgfSBmcm9tICcuLi8uLi9kYXRhYmFzZS91c2VycydcbmltcG9ydCB7IHNlbmRWZXJpZmljYXRpb24gfSBmcm9tICcuLi8uLi9lbWFpbCdcblxuY29uc3QgcmVjYXB0Y2hhRW5hYmxlZCA9IHV0aWwucmVjYXB0Y2hhLmNoZWNrUHJvdGVjdGVkQWN0aW9uKHV0aWwucmVjYXB0Y2hhLlJlY2FwdGNoYVByb3RlY3RlZEFjdGlvbnMucmVnaXN0ZXIpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnUE9TVCcsXG4gIHBhdGg6ICcvYXV0aC9yZWdpc3RlcicsXG4gIHJlcXVpcmVBdXRoOiBmYWxzZSxcbiAgc2NoZW1hOiB7XG4gICAgYm9keToge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIGN0ZnRpbWVUb2tlbjoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHJlY2FwdGNoYUNvZGU6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFsuLi4ocmVjYXB0Y2hhRW5hYmxlZCA/IFsncmVjYXB0Y2hhQ29kZSddIDogW10pXSxcbiAgICAgIG9uZU9mOiBbe1xuICAgICAgICByZXF1aXJlZDogWydlbWFpbCcsICduYW1lJ11cbiAgICAgIH0sIHtcbiAgICAgICAgcmVxdWlyZWQ6IFsnY3RmdGltZVRva2VuJ11cbiAgICAgIH1dXG4gICAgfVxuICB9LFxuICBoYW5kbGVyOiBhc3luYyAoeyByZXEgfSkgPT4ge1xuICAgIGNvbnN0IGlwID0gcmVxLmlwXG4gICAgaWYgKHJlY2FwdGNoYUVuYWJsZWQgJiYgIWF3YWl0IHV0aWwucmVjYXB0Y2hhLnZlcmlmeVJlY2FwdGNoYUNvZGUocmVxLmJvZHkucmVjYXB0Y2hhQ29kZSkpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkUmVjYXB0Y2hhQ29kZVxuICAgIH1cblxuICAgIGxldCBlbWFpbFxuICAgIGxldCByZXFOYW1lXG4gICAgbGV0IGN0ZnRpbWVJZFxuICAgIGlmIChyZXEuYm9keS5jdGZ0aW1lVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY3RmdGltZURhdGEgPSBhd2FpdCBhdXRoLnRva2VuLmdldERhdGEoYXV0aC50b2tlbi50b2tlbktpbmRzLmN0ZnRpbWVBdXRoLCByZXEuYm9keS5jdGZ0aW1lVG9rZW4pXG4gICAgICBpZiAoY3RmdGltZURhdGEgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRDdGZ0aW1lVG9rZW5cbiAgICAgIH1cbiAgICAgIHJlcU5hbWUgPSBjdGZ0aW1lRGF0YS5uYW1lXG4gICAgICBjdGZ0aW1lSWQgPSBjdGZ0aW1lRGF0YS5jdGZ0aW1lSWRcbiAgICB9IGVsc2Uge1xuICAgICAgZW1haWwgPSB1dGlsLm5vcm1hbGl6ZS5ub3JtYWxpemVFbWFpbChyZXEuYm9keS5lbWFpbClcbiAgICAgIGlmICghZW1haWxWYWxpZGF0b3IudmFsaWRhdGUoZW1haWwpKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRW1haWxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVxLmJvZHkubmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXFOYW1lID0gcmVxLmJvZHkubmFtZVxuICAgIH1cbiAgICBjb25zdCBuYW1lID0gdXRpbC5ub3JtYWxpemUubm9ybWFsaXplTmFtZShyZXFOYW1lKVxuICAgIGlmICghdXRpbC52YWxpZGF0ZS52YWxpZGF0ZU5hbWUobmFtZSkpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkTmFtZVxuICAgIH1cblxuICAgIGlmICghY29uZmlnLmVtYWlsKSB7XG4gICAgICBjb25zdCBkaXZpc2lvbiA9IGNvbmZpZy5kZWZhdWx0RGl2aXNpb24gfHwgT2JqZWN0LmtleXMoY29uZmlnLmRpdmlzaW9ucylbMF1cbiAgICAgIHJldHVybiBhdXRoLnJlZ2lzdGVyLnJlZ2lzdGVyKFxuICAgICAgICB7XG4gICAgICAgICAgZGl2aXNpb24sXG4gICAgICAgICAgZW1haWwsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjdGZ0aW1lSWRcbiAgICAgICAgfSxcbiAgICAgICAgaXBcbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBkaXZpc2lvbiA9IGNvbmZpZy5kaXZpc2lvbkFDTHNcbiAgICAgID8gdXRpbC5yZXN0cmljdC5hbGxvd2VkRGl2aXNpb25zKGVtYWlsKVswXVxuICAgICAgOiAoY29uZmlnLmRlZmF1bHREaXZpc2lvbiB8fCBPYmplY3Qua2V5cyhjb25maWcuZGl2aXNpb25zKVswXSlcbiAgICBpZiAoZGl2aXNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRDb21wZXRpdGlvbk5vdEFsbG93ZWRcbiAgICB9XG5cbiAgICBpZiAocmVxLmJvZHkuY3RmdGltZVRva2VuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBhdXRoLnJlZ2lzdGVyLnJlZ2lzdGVyKFxuICAgICAgICB7XG4gICAgICAgICAgZGl2aXNpb24sXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjdGZ0aW1lSWRcbiAgICAgICAgfSxcbiAgICAgICAgaXBcbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBjb25mbGljdFJlcyA9IGF3YWl0IGdldFVzZXJCeU5hbWVPckVtYWlsKHsgbmFtZSwgZW1haWwgfSlcbiAgICBpZiAoY29uZmxpY3RSZXMpIHtcbiAgICAgIGlmIChjb25mbGljdFJlcy5lbWFpbCA9PT0gZW1haWwpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRLbm93bkVtYWlsXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZEtub3duTmFtZVxuICAgIH1cblxuICAgIGNvbnN0IHZlcmlmeVV1aWQgPSB1dWlkdjQoKVxuICAgIGF3YWl0IGNhY2hlLmxvZ2luLm1ha2VMb2dpbih7IGlkOiB2ZXJpZnlVdWlkIH0pXG4gICAgY29uc3QgdmVyaWZ5VG9rZW4gPSBhd2FpdCBhdXRoLnRva2VuLmdldFRva2VuKGF1dGgudG9rZW4udG9rZW5LaW5kcy52ZXJpZnksIHtcbiAgICAgIHZlcmlmeUlkOiB2ZXJpZnlVdWlkLFxuICAgICAga2luZDogJ3JlZ2lzdGVyJyxcbiAgICAgIGVtYWlsLFxuICAgICAgbmFtZSxcbiAgICAgIGRpdmlzaW9uXG4gICAgfSlcblxuICAgIGF3YWl0IHNlbmRWZXJpZmljYXRpb24oe1xuICAgICAgZW1haWwsXG4gICAgICBraW5kOiAncmVnaXN0ZXInLFxuICAgICAgdG9rZW46IHZlcmlmeVRva2VuXG4gICAgfSlcblxuICAgIHJldHVybiByZXNwb25zZXMuZ29vZFZlcmlmeVNlbnRcbiAgfVxufVxuIl19