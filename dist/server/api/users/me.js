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
const responses_1 = require("../../responses");
const util_1 = require("./util");
const util = __importStar(require("../../util"));
const auth = __importStar(require("../../auth"));
exports.default = {
    method: 'GET',
    path: '/users/me',
    requireAuth: true,
    handler: async ({ user }) => {
        const uuid = user.id;
        const userData = await util_1.getUserData({ user });
        const teamToken = await auth.token.getToken(auth.token.tokenKinds.team, uuid);
        const allowedDivisions = util.restrict.allowedDivisions(user.email);
        return [responses_1.responses.goodUserData, {
                ...userData,
                teamToken,
                allowedDivisions,
                id: uuid,
                email: user.email
            }];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL3VzZXJzL21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEyQztBQUMzQyxpQ0FBb0M7QUFDcEMsaURBQWtDO0FBQ2xDLGlEQUFrQztBQUVsQyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBSSxFQUFFLFdBQVc7SUFDakIsV0FBVyxFQUFFLElBQUk7SUFDakIsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtRQUNwQixNQUFNLFFBQVEsR0FBRyxNQUFNLGtCQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBRTVDLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRTdFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFbkUsT0FBTyxDQUFDLHFCQUFTLENBQUMsWUFBWSxFQUFFO2dCQUM5QixHQUFHLFFBQVE7Z0JBQ1gsU0FBUztnQkFDVCxnQkFBZ0I7Z0JBQ2hCLEVBQUUsRUFBRSxJQUFJO2dCQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc3BvbnNlcyB9IGZyb20gJy4uLy4uL3Jlc3BvbnNlcydcbmltcG9ydCB7IGdldFVzZXJEYXRhIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuLi8uLi91dGlsJ1xuaW1wb3J0ICogYXMgYXV0aCBmcm9tICcuLi8uLi9hdXRoJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ0dFVCcsXG4gIHBhdGg6ICcvdXNlcnMvbWUnLFxuICByZXF1aXJlQXV0aDogdHJ1ZSxcbiAgaGFuZGxlcjogYXN5bmMgKHsgdXNlciB9KSA9PiB7XG4gICAgY29uc3QgdXVpZCA9IHVzZXIuaWRcbiAgICBjb25zdCB1c2VyRGF0YSA9IGF3YWl0IGdldFVzZXJEYXRhKHsgdXNlciB9KVxuXG4gICAgY29uc3QgdGVhbVRva2VuID0gYXdhaXQgYXV0aC50b2tlbi5nZXRUb2tlbihhdXRoLnRva2VuLnRva2VuS2luZHMudGVhbSwgdXVpZClcblxuICAgIGNvbnN0IGFsbG93ZWREaXZpc2lvbnMgPSB1dGlsLnJlc3RyaWN0LmFsbG93ZWREaXZpc2lvbnModXNlci5lbWFpbClcblxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RVc2VyRGF0YSwge1xuICAgICAgLi4udXNlckRhdGEsXG4gICAgICB0ZWFtVG9rZW4sXG4gICAgICBhbGxvd2VkRGl2aXNpb25zLFxuICAgICAgaWQ6IHV1aWQsXG4gICAgICBlbWFpbDogdXNlci5lbWFpbFxuICAgIH1dXG4gIH1cbn1cbiJdfQ==