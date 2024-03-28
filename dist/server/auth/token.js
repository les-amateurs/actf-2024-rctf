"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.getData = exports.tokenKinds = void 0;
const util_1 = require("util");
const crypto_1 = __importDefault(require("crypto"));
const server_1 = __importDefault(require("../config/server"));
const randomBytes = util_1.promisify(crypto_1.default.randomBytes);
const tokenKey = Buffer.from(server_1.default.tokenKey, 'base64');
var tokenKinds;
(function (tokenKinds) {
    tokenKinds[tokenKinds["auth"] = 0] = "auth";
    tokenKinds[tokenKinds["team"] = 1] = "team";
    tokenKinds[tokenKinds["verify"] = 2] = "verify";
    tokenKinds[tokenKinds["ctftimeAuth"] = 4] = "ctftimeAuth";
})(tokenKinds = exports.tokenKinds || (exports.tokenKinds = {}));
const tokenExpiries = {
    [tokenKinds.auth]: Infinity,
    [tokenKinds.team]: Infinity,
    [tokenKinds.verify]: server_1.default.loginTimeout,
    [tokenKinds.ctftimeAuth]: server_1.default.loginTimeout
};
const timeNow = () => Math.floor(Date.now() / 1000);
const encryptToken = async (content) => {
    const iv = await randomBytes(12);
    const cipher = crypto_1.default.createCipheriv('aes-256-gcm', tokenKey, iv);
    const cipherText = cipher.update(JSON.stringify(content));
    cipher.final();
    const tokenContent = Buffer.concat([iv, cipherText, cipher.getAuthTag()]);
    return tokenContent.toString('base64');
};
const decryptToken = async (token) => {
    try {
        const tokenContent = Buffer.from(token, 'base64');
        const iv = tokenContent.slice(0, 12);
        const authTag = tokenContent.slice(tokenContent.length - 16);
        const cipher = crypto_1.default.createDecipheriv('aes-256-gcm', tokenKey, iv);
        cipher.setAuthTag(authTag);
        const plainText = cipher.update(tokenContent.slice(12, tokenContent.length - 16));
        cipher.final();
        return JSON.parse(plainText.toString());
    }
    catch (e) {
        return null;
    }
};
exports.getData = async (expectedTokenKind, token) => {
    const content = await decryptToken(token);
    if (content === null) {
        return null;
    }
    const { k: kind, t: createdAt, d: data } = content;
    if (kind !== expectedTokenKind) {
        return null;
    }
    if (createdAt + tokenExpiries[kind] < timeNow()) {
        return null;
    }
    return data;
};
exports.getToken = async (tokenKind, data) => {
    const token = await encryptToken({
        k: tokenKind,
        t: timeNow(),
        d: data
    });
    return token;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvYXV0aC90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrQkFBZ0M7QUFDaEMsb0RBQTJCO0FBQzNCLDhEQUFxQztBQUlyQyxNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUV2RCxJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDcEIsMkNBQVEsQ0FBQTtJQUNSLDJDQUFRLENBQUE7SUFDUiwrQ0FBVSxDQUFBO0lBQ1YseURBQWUsQ0FBQTtBQUNqQixDQUFDLEVBTFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFLckI7QUF5REQsTUFBTSxhQUFhLEdBQStDO0lBQ2hFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVE7SUFDM0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUTtJQUMzQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxnQkFBTSxDQUFDLFlBQVk7SUFDeEMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUUsZ0JBQU0sQ0FBQyxZQUFZO0NBQzlDLENBQUE7QUFFRCxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUVuRCxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQTJCLE9BQWdDLEVBQWtCLEVBQUU7SUFDdkcsTUFBTSxFQUFFLEdBQUcsTUFBTSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDaEMsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNqRSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUN6RCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDZCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3pFLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUN4QyxDQUFDLENBQUE7QUFFRCxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQTJCLEtBQVksRUFBMkMsRUFBRTtJQUM1RyxJQUFJO1FBQ0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDakQsTUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDcEMsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQzVELE1BQU0sTUFBTSxHQUFHLGdCQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNuRSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzFCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pGLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQTRCLENBQUE7S0FDbkU7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sSUFBSSxDQUFBO0tBQ1o7QUFDSCxDQUFDLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRyxLQUFLLEVBQTJCLGlCQUF1QixFQUFFLEtBQVksRUFBd0MsRUFBRTtJQUNwSSxNQUFNLE9BQU8sR0FBRyxNQUFNLFlBQVksQ0FBTyxLQUFLLENBQUMsQ0FBQTtJQUMvQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUNELE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUNsRCxJQUFJLElBQUksS0FBSyxpQkFBaUIsRUFBRTtRQUM5QixPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sRUFBRSxFQUFFO1FBQy9DLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUMsQ0FBQTtBQUVZLFFBQUEsUUFBUSxHQUFHLEtBQUssRUFBMkIsU0FBZSxFQUFFLElBQTBCLEVBQWtCLEVBQUU7SUFDckgsTUFBTSxLQUFLLEdBQUcsTUFBTSxZQUFZLENBQUM7UUFDL0IsQ0FBQyxFQUFFLFNBQVM7UUFDWixDQUFDLEVBQUUsT0FBTyxFQUFFO1FBQ1osQ0FBQyxFQUFFLElBQUk7S0FDUixDQUFDLENBQUE7SUFDRixPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gJ3V0aWwnXG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0bydcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL3NlcnZlcidcbmltcG9ydCB7IFZhbHVlT2YgfSBmcm9tICd0eXBlLWZlc3QnXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vZGF0YWJhc2UvdXNlcnMnXG5cbmNvbnN0IHJhbmRvbUJ5dGVzID0gcHJvbWlzaWZ5KGNyeXB0by5yYW5kb21CeXRlcylcbmNvbnN0IHRva2VuS2V5ID0gQnVmZmVyLmZyb20oY29uZmlnLnRva2VuS2V5LCAnYmFzZTY0JylcblxuZXhwb3J0IGVudW0gdG9rZW5LaW5kcyB7XG4gIGF1dGggPSAwLFxuICB0ZWFtID0gMSxcbiAgdmVyaWZ5ID0gMixcbiAgY3RmdGltZUF1dGggPSA0XG59XG5cbmV4cG9ydCB0eXBlIFZlcmlmeVRva2VuS2luZHMgPSAndXBkYXRlJyB8ICdyZWdpc3RlcicgfCAncmVjb3ZlcidcblxuZXhwb3J0IHR5cGUgQXV0aFRva2VuRGF0YSA9IHN0cmluZ1xuXG5leHBvcnQgdHlwZSBUZWFtVG9rZW5EYXRhID0gc3RyaW5nXG5cbmludGVyZmFjZSBCYXNlVmVyaWZ5VG9rZW5EYXRhIHtcbiAgdmVyaWZ5SWQ6IHN0cmluZ1xuICBraW5kOiBWZXJpZnlUb2tlbktpbmRzXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVnaXN0ZXJWZXJpZnlUb2tlbkRhdGEgZXh0ZW5kcyBCYXNlVmVyaWZ5VG9rZW5EYXRhIHtcbiAga2luZDogJ3JlZ2lzdGVyJ1xuICBlbWFpbDogVXNlclsnZW1haWwnXVxuICBuYW1lOiBVc2VyWyduYW1lJ11cbiAgZGl2aXNpb246IFVzZXJbJ2RpdmlzaW9uJ11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVWZXJpZnlUb2tlbkRhdGEgZXh0ZW5kcyBCYXNlVmVyaWZ5VG9rZW5EYXRhIHtcbiAga2luZDogJ3VwZGF0ZSdcbiAgdXNlcklkOiBVc2VyWydpZCddXG4gIGVtYWlsOiBVc2VyWydlbWFpbCddXG4gIGRpdmlzaW9uOiBVc2VyWydkaXZpc2lvbiddXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjb3ZlclRva2VuRGF0YSBleHRlbmRzIEJhc2VWZXJpZnlUb2tlbkRhdGEge1xuICBraW5kOiAncmVjb3ZlcidcbiAgdXNlcklkOiBVc2VyWydpZCddXG4gIGVtYWlsOiBVc2VyWydlbWFpbCddXG59XG5cbmV4cG9ydCB0eXBlIFZlcmlmeVRva2VuRGF0YSA9IFJlZ2lzdGVyVmVyaWZ5VG9rZW5EYXRhIHwgVXBkYXRlVmVyaWZ5VG9rZW5EYXRhIHwgUmVjb3ZlclRva2VuRGF0YVxuXG5leHBvcnQgaW50ZXJmYWNlIEN0ZnRpbWVBdXRoVG9rZW5EYXRhIHtcbiAgbmFtZTogVXNlclsnbmFtZSddXG4gIGN0ZnRpbWVJZDogVXNlclsnY3RmdGltZUlkJ11cbn1cblxuLy8gSW50ZXJuYWwgbWFwIG9mIHR5cGUgZGVmaW5pdGlvbnMgZm9yIHR5cGluZyBwdXJwb3NlcyBvbmx5IC1cbi8vIHRoaXMgdHlwZSBkb2VzIG5vdCBkZXNjcmliZSBhIHJlYWwgZGF0YS1zdHJ1Y3R1cmVcbnR5cGUgVG9rZW5EYXRhVHlwZXMgPSB7XG4gIFt0b2tlbktpbmRzLmF1dGhdOiBBdXRoVG9rZW5EYXRhO1xuICBbdG9rZW5LaW5kcy50ZWFtXTogVGVhbVRva2VuRGF0YTtcbiAgW3Rva2VuS2luZHMudmVyaWZ5XTogVmVyaWZ5VG9rZW5EYXRhO1xuICBbdG9rZW5LaW5kcy5jdGZ0aW1lQXV0aF06IEN0ZnRpbWVBdXRoVG9rZW5EYXRhO1xufVxuXG5leHBvcnQgdHlwZSBUb2tlbiA9IHN0cmluZ1xuXG5pbnRlcmZhY2UgSW50ZXJuYWxUb2tlbkRhdGE8S2luZCBleHRlbmRzIHRva2VuS2luZHM+IHtcbiAgazogS2luZFxuICB0OiBudW1iZXJcbiAgZDogVG9rZW5EYXRhVHlwZXNbS2luZF1cbn1cblxuY29uc3QgdG9rZW5FeHBpcmllczogUmVjb3JkPFZhbHVlT2Y8dHlwZW9mIHRva2VuS2luZHM+LCBudW1iZXI+ID0ge1xuICBbdG9rZW5LaW5kcy5hdXRoXTogSW5maW5pdHksXG4gIFt0b2tlbktpbmRzLnRlYW1dOiBJbmZpbml0eSxcbiAgW3Rva2VuS2luZHMudmVyaWZ5XTogY29uZmlnLmxvZ2luVGltZW91dCxcbiAgW3Rva2VuS2luZHMuY3RmdGltZUF1dGhdOiBjb25maWcubG9naW5UaW1lb3V0XG59XG5cbmNvbnN0IHRpbWVOb3cgPSAoKSA9PiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKVxuXG5jb25zdCBlbmNyeXB0VG9rZW4gPSBhc3luYyA8S2luZCBleHRlbmRzIHRva2VuS2luZHM+KGNvbnRlbnQ6IEludGVybmFsVG9rZW5EYXRhPEtpbmQ+KTogUHJvbWlzZTxUb2tlbj4gPT4ge1xuICBjb25zdCBpdiA9IGF3YWl0IHJhbmRvbUJ5dGVzKDEyKVxuICBjb25zdCBjaXBoZXIgPSBjcnlwdG8uY3JlYXRlQ2lwaGVyaXYoJ2Flcy0yNTYtZ2NtJywgdG9rZW5LZXksIGl2KVxuICBjb25zdCBjaXBoZXJUZXh0ID0gY2lwaGVyLnVwZGF0ZShKU09OLnN0cmluZ2lmeShjb250ZW50KSlcbiAgY2lwaGVyLmZpbmFsKClcbiAgY29uc3QgdG9rZW5Db250ZW50ID0gQnVmZmVyLmNvbmNhdChbaXYsIGNpcGhlclRleHQsIGNpcGhlci5nZXRBdXRoVGFnKCldKVxuICByZXR1cm4gdG9rZW5Db250ZW50LnRvU3RyaW5nKCdiYXNlNjQnKVxufVxuXG5jb25zdCBkZWNyeXB0VG9rZW4gPSBhc3luYyA8S2luZCBleHRlbmRzIHRva2VuS2luZHM+KHRva2VuOiBUb2tlbik6IFByb21pc2U8SW50ZXJuYWxUb2tlbkRhdGE8S2luZD4gfCBudWxsPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdG9rZW5Db250ZW50ID0gQnVmZmVyLmZyb20odG9rZW4sICdiYXNlNjQnKVxuICAgIGNvbnN0IGl2ID0gdG9rZW5Db250ZW50LnNsaWNlKDAsIDEyKVxuICAgIGNvbnN0IGF1dGhUYWcgPSB0b2tlbkNvbnRlbnQuc2xpY2UodG9rZW5Db250ZW50Lmxlbmd0aCAtIDE2KVxuICAgIGNvbnN0IGNpcGhlciA9IGNyeXB0by5jcmVhdGVEZWNpcGhlcml2KCdhZXMtMjU2LWdjbScsIHRva2VuS2V5LCBpdilcbiAgICBjaXBoZXIuc2V0QXV0aFRhZyhhdXRoVGFnKVxuICAgIGNvbnN0IHBsYWluVGV4dCA9IGNpcGhlci51cGRhdGUodG9rZW5Db250ZW50LnNsaWNlKDEyLCB0b2tlbkNvbnRlbnQubGVuZ3RoIC0gMTYpKVxuICAgIGNpcGhlci5maW5hbCgpXG4gICAgcmV0dXJuIEpTT04ucGFyc2UocGxhaW5UZXh0LnRvU3RyaW5nKCkpIGFzIEludGVybmFsVG9rZW5EYXRhPEtpbmQ+XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXREYXRhID0gYXN5bmMgPEtpbmQgZXh0ZW5kcyB0b2tlbktpbmRzPihleHBlY3RlZFRva2VuS2luZDogS2luZCwgdG9rZW46IFRva2VuKTogUHJvbWlzZTxUb2tlbkRhdGFUeXBlc1tLaW5kXSB8IG51bGw+ID0+IHtcbiAgY29uc3QgY29udGVudCA9IGF3YWl0IGRlY3J5cHRUb2tlbjxLaW5kPih0b2tlbilcbiAgaWYgKGNvbnRlbnQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGNvbnN0IHsgazoga2luZCwgdDogY3JlYXRlZEF0LCBkOiBkYXRhIH0gPSBjb250ZW50XG4gIGlmIChraW5kICE9PSBleHBlY3RlZFRva2VuS2luZCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgaWYgKGNyZWF0ZWRBdCArIHRva2VuRXhwaXJpZXNba2luZF0gPCB0aW1lTm93KCkpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHJldHVybiBkYXRhXG59XG5cbmV4cG9ydCBjb25zdCBnZXRUb2tlbiA9IGFzeW5jIDxLaW5kIGV4dGVuZHMgdG9rZW5LaW5kcz4odG9rZW5LaW5kOiBLaW5kLCBkYXRhOiBUb2tlbkRhdGFUeXBlc1tLaW5kXSk6IFByb21pc2U8VG9rZW4+ID0+IHtcbiAgY29uc3QgdG9rZW4gPSBhd2FpdCBlbmNyeXB0VG9rZW4oe1xuICAgIGs6IHRva2VuS2luZCxcbiAgICB0OiB0aW1lTm93KCksXG4gICAgZDogZGF0YVxuICB9KVxuICByZXR1cm4gdG9rZW5cbn1cbiJdfQ==