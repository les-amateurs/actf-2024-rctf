"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProtectedAction = exports.verifyRecaptchaCode = exports.RecaptchaProtectedActions = void 0;
const got_1 = __importDefault(require("got"));
const server_1 = __importDefault(require("../config/server"));
var RecaptchaProtectedActions;
(function (RecaptchaProtectedActions) {
    RecaptchaProtectedActions["register"] = "register";
    RecaptchaProtectedActions["recover"] = "recover";
    RecaptchaProtectedActions["setEmail"] = "setEmail";
})(RecaptchaProtectedActions = exports.RecaptchaProtectedActions || (exports.RecaptchaProtectedActions = {}));
exports.verifyRecaptchaCode = async (code) => {
    if (!server_1.default.recaptcha) {
        throw new Error('recaptcha is not configured');
    }
    const { body } = await got_1.default({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        method: 'POST',
        responseType: 'json',
        form: {
            secret: server_1.default.recaptcha.secretKey,
            response: code
        }
    });
    return body.success;
};
exports.checkProtectedAction = (action) => {
    var _a, _b;
    return (_b = (_a = server_1.default.recaptcha) === null || _a === void 0 ? void 0 : _a.protectedActions.includes(action)) !== null && _b !== void 0 ? _b : false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjYXB0Y2hhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL3V0aWwvcmVjYXB0Y2hhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhDQUFxQjtBQUNyQiw4REFBcUM7QUFFckMsSUFBWSx5QkFJWDtBQUpELFdBQVkseUJBQXlCO0lBQ25DLGtEQUFxQixDQUFBO0lBQ3JCLGdEQUFtQixDQUFBO0lBQ25CLGtEQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFKVyx5QkFBeUIsR0FBekIsaUNBQXlCLEtBQXpCLGlDQUF5QixRQUlwQztBQUVZLFFBQUEsbUJBQW1CLEdBQUcsS0FBSyxFQUFFLElBQVksRUFBb0IsRUFBRTtJQUMxRSxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxTQUFTLEVBQUU7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0tBQy9DO0lBQ0QsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFtQyxNQUFNLGFBQUcsQ0FBQztRQUN6RCxHQUFHLEVBQUUsaURBQWlEO1FBQ3RELE1BQU0sRUFBRSxNQUFNO1FBQ2QsWUFBWSxFQUFFLE1BQU07UUFDcEIsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLGdCQUFNLENBQUMsU0FBUyxDQUFDLFNBQVM7WUFDbEMsUUFBUSxFQUFFLElBQUk7U0FDZjtLQUNGLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFWSxRQUFBLG9CQUFvQixHQUFHLENBQUMsTUFBaUMsRUFBVyxFQUFFOztJQUNqRixtQkFBTyxnQkFBTSxDQUFDLFNBQVMsMENBQUUsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sb0NBQUssS0FBSyxDQUFBO0FBQ3JFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnb3QgZnJvbSAnZ290J1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcvc2VydmVyJ1xuXG5leHBvcnQgZW51bSBSZWNhcHRjaGFQcm90ZWN0ZWRBY3Rpb25zIHtcbiAgcmVnaXN0ZXIgPSAncmVnaXN0ZXInLFxuICByZWNvdmVyID0gJ3JlY292ZXInLFxuICBzZXRFbWFpbCA9ICdzZXRFbWFpbCdcbn1cblxuZXhwb3J0IGNvbnN0IHZlcmlmeVJlY2FwdGNoYUNvZGUgPSBhc3luYyAoY29kZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gIGlmICghY29uZmlnLnJlY2FwdGNoYSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncmVjYXB0Y2hhIGlzIG5vdCBjb25maWd1cmVkJylcbiAgfVxuICBjb25zdCB7IGJvZHkgfTogeyBib2R5OiB7IHN1Y2Nlc3M6IGJvb2xlYW4gfSB9ID0gYXdhaXQgZ290KHtcbiAgICB1cmw6ICdodHRwczovL3d3dy5nb29nbGUuY29tL3JlY2FwdGNoYS9hcGkvc2l0ZXZlcmlmeScsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgZm9ybToge1xuICAgICAgc2VjcmV0OiBjb25maWcucmVjYXB0Y2hhLnNlY3JldEtleSxcbiAgICAgIHJlc3BvbnNlOiBjb2RlXG4gICAgfVxuICB9KVxuICByZXR1cm4gYm9keS5zdWNjZXNzXG59XG5cbmV4cG9ydCBjb25zdCBjaGVja1Byb3RlY3RlZEFjdGlvbiA9IChhY3Rpb246IFJlY2FwdGNoYVByb3RlY3RlZEFjdGlvbnMpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGNvbmZpZy5yZWNhcHRjaGE/LnByb3RlY3RlZEFjdGlvbnMuaW5jbHVkZXMoYWN0aW9uKSA/PyBmYWxzZVxufVxuIl19