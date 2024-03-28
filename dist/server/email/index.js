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
exports.sendVerification = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mustache_1 = __importDefault(require("mustache"));
const server_1 = __importDefault(require("../config/server"));
let sendVerification = async () => {
    throw new Error('email verification requested when email provider is not configured');
};
exports.sendVerification = sendVerification;
const emailConfig = server_1.default.email;
if (emailConfig) {
    const provider = (async () => {
        var _a;
        const { default: Provider } = await Promise.resolve().then(() => __importStar(require(path_1.default.join('../providers', emailConfig.provider.name))));
        return new Provider((_a = emailConfig.provider.options) !== null && _a !== void 0 ? _a : {});
    })();
    const verifyHtml = fs_1.default.readFileSync(path_1.default.join(__dirname, 'emails/verify.html')).toString();
    const verifyText = fs_1.default.readFileSync(path_1.default.join(__dirname, 'emails/verify.txt')).toString();
    // This function is already typed earlier in the file; no need to repeat the type definition
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    exports.sendVerification = sendVerification = async ({ token, kind, email }) => {
        const emailView = {
            ctf_name: server_1.default.ctfName,
            logo_url: server_1.default.logoUrl,
            origin: server_1.default.origin,
            token: encodeURIComponent(token),
            register: kind === 'register',
            recover: kind === 'recover',
            update: kind === 'update'
        };
        const subject = {
            register: `Email verification for ${server_1.default.ctfName}`,
            recover: `Account recovery for ${server_1.default.ctfName}`,
            update: `Update your ${server_1.default.ctfName} email`
        }[kind];
        await (await provider).send({
            from: `${server_1.default.ctfName} <${emailConfig.from}>`,
            to: email,
            subject,
            html: mustache_1.default.render(verifyHtml, emailView),
            text: mustache_1.default.render(verifyText, emailView)
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvZW1haWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF1QjtBQUN2Qiw0Q0FBbUI7QUFDbkIsd0RBQStCO0FBQy9CLDhEQUFxQztBQUtyQyxJQUFJLGdCQUFnQixHQUlFLEtBQUssSUFBSSxFQUFFO0lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQTtBQUN2RixDQUFDLENBQUE7QUF3Q1EsNENBQWdCO0FBdEN6QixNQUFNLFdBQVcsR0FBRyxnQkFBTSxDQUFDLEtBQUssQ0FBQTtBQUNoQyxJQUFJLFdBQVcsRUFBRTtJQUNmLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7O1FBQzNCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsd0RBQWEsY0FBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBcUMsQ0FBQTtRQUNwSSxPQUFPLElBQUksUUFBUSxPQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsQ0FBQTtJQUN6RCxDQUFDLENBQUMsRUFBRSxDQUFBO0lBRUosTUFBTSxVQUFVLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDekYsTUFBTSxVQUFVLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7SUFFeEYsNEZBQTRGO0lBQzVGLDZFQUE2RTtJQUM3RSwyQkFBQSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7UUFDbEQsTUFBTSxTQUFTLEdBQUc7WUFDaEIsUUFBUSxFQUFFLGdCQUFNLENBQUMsT0FBTztZQUN4QixRQUFRLEVBQUUsZ0JBQU0sQ0FBQyxPQUFPO1lBQ3hCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLE1BQU07WUFDckIsS0FBSyxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQztZQUNoQyxRQUFRLEVBQUUsSUFBSSxLQUFLLFVBQVU7WUFDN0IsT0FBTyxFQUFFLElBQUksS0FBSyxTQUFTO1lBQzNCLE1BQU0sRUFBRSxJQUFJLEtBQUssUUFBUTtTQUMxQixDQUFBO1FBQ0QsTUFBTSxPQUFPLEdBQUc7WUFDZCxRQUFRLEVBQUUsMEJBQTBCLGdCQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3BELE9BQU8sRUFBRSx3QkFBd0IsZ0JBQU0sQ0FBQyxPQUFPLEVBQUU7WUFDakQsTUFBTSxFQUFFLGVBQWUsZ0JBQU0sQ0FBQyxPQUFPLFFBQVE7U0FDOUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVQLE1BQU0sQ0FBQyxNQUFNLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxQixJQUFJLEVBQUUsR0FBRyxnQkFBTSxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUMsSUFBSSxHQUFHO1lBQy9DLEVBQUUsRUFBRSxLQUFLO1lBQ1QsT0FBTztZQUNQLElBQUksRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO1lBQzVDLElBQUksRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDO1NBQzdDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBtdXN0YWNoZSBmcm9tICdtdXN0YWNoZSdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL3NlcnZlcidcbmltcG9ydCB7IFByb3ZpZGVyQ29uc3RydWN0b3IgfSBmcm9tICcuL3Byb3ZpZGVyJ1xuXG5leHBvcnQgdHlwZSBWZXJpZmljYXRpb25FbWFpbEtpbmQgPSAncmVnaXN0ZXInIHwgJ3JlY292ZXInIHwgJ3VwZGF0ZSdcblxubGV0IHNlbmRWZXJpZmljYXRpb246IChkYXRhOiB7XG4gIHRva2VuOiBzdHJpbmcsXG4gIGtpbmQ6IFZlcmlmaWNhdGlvbkVtYWlsS2luZCxcbiAgZW1haWw6IHN0cmluZ1xufSkgPT4gUHJvbWlzZTx2b2lkPiA9IGFzeW5jICgpID0+IHtcbiAgdGhyb3cgbmV3IEVycm9yKCdlbWFpbCB2ZXJpZmljYXRpb24gcmVxdWVzdGVkIHdoZW4gZW1haWwgcHJvdmlkZXIgaXMgbm90IGNvbmZpZ3VyZWQnKVxufVxuXG5jb25zdCBlbWFpbENvbmZpZyA9IGNvbmZpZy5lbWFpbFxuaWYgKGVtYWlsQ29uZmlnKSB7XG4gIGNvbnN0IHByb3ZpZGVyID0gKGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IGRlZmF1bHQ6IFByb3ZpZGVyIH0gPSBhd2FpdCBpbXBvcnQocGF0aC5qb2luKCcuLi9wcm92aWRlcnMnLCBlbWFpbENvbmZpZy5wcm92aWRlci5uYW1lKSkgYXMgeyBkZWZhdWx0OiBQcm92aWRlckNvbnN0cnVjdG9yIH1cbiAgICByZXR1cm4gbmV3IFByb3ZpZGVyKGVtYWlsQ29uZmlnLnByb3ZpZGVyLm9wdGlvbnMgPz8ge30pXG4gIH0pKClcblxuICBjb25zdCB2ZXJpZnlIdG1sID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsICdlbWFpbHMvdmVyaWZ5Lmh0bWwnKSkudG9TdHJpbmcoKVxuICBjb25zdCB2ZXJpZnlUZXh0ID0gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsICdlbWFpbHMvdmVyaWZ5LnR4dCcpKS50b1N0cmluZygpXG5cbiAgLy8gVGhpcyBmdW5jdGlvbiBpcyBhbHJlYWR5IHR5cGVkIGVhcmxpZXIgaW4gdGhlIGZpbGU7IG5vIG5lZWQgdG8gcmVwZWF0IHRoZSB0eXBlIGRlZmluaXRpb25cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgc2VuZFZlcmlmaWNhdGlvbiA9IGFzeW5jICh7IHRva2VuLCBraW5kLCBlbWFpbCB9KSA9PiB7XG4gICAgY29uc3QgZW1haWxWaWV3ID0ge1xuICAgICAgY3RmX25hbWU6IGNvbmZpZy5jdGZOYW1lLFxuICAgICAgbG9nb191cmw6IGNvbmZpZy5sb2dvVXJsLFxuICAgICAgb3JpZ2luOiBjb25maWcub3JpZ2luLFxuICAgICAgdG9rZW46IGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbiksXG4gICAgICByZWdpc3Rlcjoga2luZCA9PT0gJ3JlZ2lzdGVyJyxcbiAgICAgIHJlY292ZXI6IGtpbmQgPT09ICdyZWNvdmVyJyxcbiAgICAgIHVwZGF0ZToga2luZCA9PT0gJ3VwZGF0ZSdcbiAgICB9XG4gICAgY29uc3Qgc3ViamVjdCA9IHtcbiAgICAgIHJlZ2lzdGVyOiBgRW1haWwgdmVyaWZpY2F0aW9uIGZvciAke2NvbmZpZy5jdGZOYW1lfWAsXG4gICAgICByZWNvdmVyOiBgQWNjb3VudCByZWNvdmVyeSBmb3IgJHtjb25maWcuY3RmTmFtZX1gLFxuICAgICAgdXBkYXRlOiBgVXBkYXRlIHlvdXIgJHtjb25maWcuY3RmTmFtZX0gZW1haWxgXG4gICAgfVtraW5kXVxuXG4gICAgYXdhaXQgKGF3YWl0IHByb3ZpZGVyKS5zZW5kKHtcbiAgICAgIGZyb206IGAke2NvbmZpZy5jdGZOYW1lfSA8JHtlbWFpbENvbmZpZy5mcm9tfT5gLFxuICAgICAgdG86IGVtYWlsLFxuICAgICAgc3ViamVjdCxcbiAgICAgIGh0bWw6IG11c3RhY2hlLnJlbmRlcih2ZXJpZnlIdG1sLCBlbWFpbFZpZXcpLFxuICAgICAgdGV4dDogbXVzdGFjaGUucmVuZGVyKHZlcmlmeVRleHQsIGVtYWlsVmlldylcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCB7IHNlbmRWZXJpZmljYXRpb24gfVxuIl19