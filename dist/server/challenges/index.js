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
exports.deleteChallenge = exports.updateChallenge = exports.resetCache = exports.getCleanedChallenge = exports.getChallenge = exports.getCleanedChallenges = exports.getAllChallenges = void 0;
const server_1 = __importDefault(require("../config/server"));
const path_1 = __importDefault(require("path"));
const challs_1 = require("../cache/challs");
let provider;
let challenges = [];
let cleanedChallenges = [];
let challengesMap = new Map();
let cleanedChallengesMap = new Map();
const cleanChallenge = (chall) => {
    const { files, description, author, points, id, name, category, sortWeight } = chall;
    return {
        files,
        description,
        author,
        points,
        id,
        name,
        category,
        sortWeight
    };
};
const onUpdate = (newChallenges) => {
    challenges = newChallenges;
    challengesMap = new Map(newChallenges.map(c => [c.id, c]));
    cleanedChallenges = challenges.map(cleanChallenge);
    cleanedChallengesMap = new Map(cleanedChallenges.map(c => [c.id, c]));
};
void Promise.resolve().then(() => __importStar(require(path_1.default.join('../providers', server_1.default.challengeProvider.name)))).then(({ default: Provider }) => {
    var _a;
    provider = new Provider((_a = server_1.default.challengeProvider.options) !== null && _a !== void 0 ? _a : {});
    provider.on('update', onUpdate);
});
challs_1.challUpdateEmitter.on('update', () => {
    provider.forceUpdate();
});
function getAllChallenges() {
    return challenges;
}
exports.getAllChallenges = getAllChallenges;
function getCleanedChallenges() {
    return cleanedChallenges;
}
exports.getCleanedChallenges = getCleanedChallenges;
function getChallenge(id) {
    return challengesMap.get(id);
}
exports.getChallenge = getChallenge;
function getCleanedChallenge(id) {
    return cleanedChallengesMap.get(id);
}
exports.getCleanedChallenge = getCleanedChallenge;
function resetCache() {
    provider.forceUpdate();
}
exports.resetCache = resetCache;
async function updateChallenge(chall) {
    await provider.updateChallenge(chall);
    await challs_1.publishChallUpdate();
}
exports.updateChallenge = updateChallenge;
async function deleteChallenge(id) {
    await provider.deleteChallenge(id);
    await challs_1.publishChallUpdate();
}
exports.deleteChallenge = deleteChallenge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvY2hhbGxlbmdlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQXFDO0FBQ3JDLGdEQUF1QjtBQUd2Qiw0Q0FBd0U7QUFHeEUsSUFBSSxRQUFrQixDQUFBO0FBRXRCLElBQUksVUFBVSxHQUFnQixFQUFFLENBQUE7QUFDaEMsSUFBSSxpQkFBaUIsR0FBdUIsRUFBRSxDQUFBO0FBRTlDLElBQUksYUFBYSxHQUFHLElBQUksR0FBRyxFQUFxQixDQUFBO0FBQ2hELElBQUksb0JBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUE7QUFFOUQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFnQixFQUFvQixFQUFFO0lBQzVELE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsS0FBSyxDQUFBO0lBRXBGLE9BQU87UUFDTCxLQUFLO1FBQ0wsV0FBVztRQUNYLE1BQU07UUFDTixNQUFNO1FBQ04sRUFBRTtRQUNGLElBQUk7UUFDSixRQUFRO1FBQ1IsVUFBVTtLQUNYLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLGFBQTBCLEVBQVEsRUFBRTtJQUNwRCxVQUFVLEdBQUcsYUFBYSxDQUFBO0lBQzFCLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMxRCxpQkFBaUIsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ2xELG9CQUFvQixHQUFHLElBQUksR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdkUsQ0FBQyxDQUFBO0FBRUQsS0FBSyxrREFBTyxjQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxnQkFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUNqRSxJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQW9DLEVBQVEsRUFBRTs7SUFDdEUsUUFBUSxHQUFHLElBQUksUUFBUSxPQUFDLGdCQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsQ0FBQTtJQUUvRCxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FHSDtBQUFDLDJCQUFtQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQ3RELFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtBQUN4QixDQUFDLENBQUMsQ0FBQTtBQUVGLFNBQWdCLGdCQUFnQjtJQUM5QixPQUFPLFVBQVUsQ0FBQTtBQUNuQixDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixvQkFBb0I7SUFDbEMsT0FBTyxpQkFBaUIsQ0FBQTtBQUMxQixDQUFDO0FBRkQsb0RBRUM7QUFFRCxTQUFnQixZQUFZLENBQUUsRUFBVTtJQUN0QyxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDOUIsQ0FBQztBQUZELG9DQUVDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUUsRUFBVTtJQUM3QyxPQUFPLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNyQyxDQUFDO0FBRkQsa0RBRUM7QUFFRCxTQUFnQixVQUFVO0lBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtBQUN4QixDQUFDO0FBRkQsZ0NBRUM7QUFFTSxLQUFLLFVBQVUsZUFBZSxDQUFFLEtBQWdCO0lBQ3JELE1BQU0sUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQyxNQUFNLDJCQUFrQixFQUFFLENBQUE7QUFDNUIsQ0FBQztBQUhELDBDQUdDO0FBRU0sS0FBSyxVQUFVLGVBQWUsQ0FBRSxFQUFVO0lBQy9DLE1BQU0sUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNsQyxNQUFNLDJCQUFrQixFQUFFLENBQUE7QUFDNUIsQ0FBQztBQUhELDBDQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcvc2VydmVyJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IENoYWxsZW5nZSwgQ2xlYW5lZENoYWxsZW5nZSB9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgeyBQcm92aWRlciwgUHJvdmlkZXJDb25zdHJ1Y3RvciB9IGZyb20gJy4vUHJvdmlkZXInXG5pbXBvcnQgeyBjaGFsbFVwZGF0ZUVtaXR0ZXIsIHB1Ymxpc2hDaGFsbFVwZGF0ZSB9IGZyb20gJy4uL2NhY2hlL2NoYWxscydcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cydcblxubGV0IHByb3ZpZGVyOiBQcm92aWRlclxuXG5sZXQgY2hhbGxlbmdlczogQ2hhbGxlbmdlW10gPSBbXVxubGV0IGNsZWFuZWRDaGFsbGVuZ2VzOiBDbGVhbmVkQ2hhbGxlbmdlW10gPSBbXVxuXG5sZXQgY2hhbGxlbmdlc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBDaGFsbGVuZ2U+KClcbmxldCBjbGVhbmVkQ2hhbGxlbmdlc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBDbGVhbmVkQ2hhbGxlbmdlPigpXG5cbmNvbnN0IGNsZWFuQ2hhbGxlbmdlID0gKGNoYWxsOiBDaGFsbGVuZ2UpOiBDbGVhbmVkQ2hhbGxlbmdlID0+IHtcbiAgY29uc3QgeyBmaWxlcywgZGVzY3JpcHRpb24sIGF1dGhvciwgcG9pbnRzLCBpZCwgbmFtZSwgY2F0ZWdvcnksIHNvcnRXZWlnaHQgfSA9IGNoYWxsXG5cbiAgcmV0dXJuIHtcbiAgICBmaWxlcyxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBhdXRob3IsXG4gICAgcG9pbnRzLFxuICAgIGlkLFxuICAgIG5hbWUsXG4gICAgY2F0ZWdvcnksXG4gICAgc29ydFdlaWdodFxuICB9XG59XG5cbmNvbnN0IG9uVXBkYXRlID0gKG5ld0NoYWxsZW5nZXM6IENoYWxsZW5nZVtdKTogdm9pZCA9PiB7XG4gIGNoYWxsZW5nZXMgPSBuZXdDaGFsbGVuZ2VzXG4gIGNoYWxsZW5nZXNNYXAgPSBuZXcgTWFwKG5ld0NoYWxsZW5nZXMubWFwKGMgPT4gW2MuaWQsIGNdKSlcbiAgY2xlYW5lZENoYWxsZW5nZXMgPSBjaGFsbGVuZ2VzLm1hcChjbGVhbkNoYWxsZW5nZSlcbiAgY2xlYW5lZENoYWxsZW5nZXNNYXAgPSBuZXcgTWFwKGNsZWFuZWRDaGFsbGVuZ2VzLm1hcChjID0+IFtjLmlkLCBjXSkpXG59XG5cbnZvaWQgaW1wb3J0KHBhdGguam9pbignLi4vcHJvdmlkZXJzJywgY29uZmlnLmNoYWxsZW5nZVByb3ZpZGVyLm5hbWUpKVxuICAudGhlbigoeyBkZWZhdWx0OiBQcm92aWRlciB9OiB7IGRlZmF1bHQ6IFByb3ZpZGVyQ29uc3RydWN0b3IgfSk6IHZvaWQgPT4ge1xuICAgIHByb3ZpZGVyID0gbmV3IFByb3ZpZGVyKGNvbmZpZy5jaGFsbGVuZ2VQcm92aWRlci5vcHRpb25zID8/IHt9KVxuXG4gICAgcHJvdmlkZXIub24oJ3VwZGF0ZScsIG9uVXBkYXRlKVxuICB9KVxuXG4vLyBGSVhNRTogcmVtb3ZlIGNhc3Qgb25jZSBjYWNoZSBpcyB0eXBlZFxuOyhjaGFsbFVwZGF0ZUVtaXR0ZXIgYXMgRXZlbnRFbWl0dGVyKS5vbigndXBkYXRlJywgKCkgPT4ge1xuICBwcm92aWRlci5mb3JjZVVwZGF0ZSgpXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsQ2hhbGxlbmdlcyAoKTogQ2hhbGxlbmdlW10ge1xuICByZXR1cm4gY2hhbGxlbmdlc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xlYW5lZENoYWxsZW5nZXMgKCk6IENsZWFuZWRDaGFsbGVuZ2VbXSB7XG4gIHJldHVybiBjbGVhbmVkQ2hhbGxlbmdlc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbGxlbmdlIChpZDogc3RyaW5nKTogQ2hhbGxlbmdlIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIGNoYWxsZW5nZXNNYXAuZ2V0KGlkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xlYW5lZENoYWxsZW5nZSAoaWQ6IHN0cmluZyk6IENsZWFuZWRDaGFsbGVuZ2UgfCB1bmRlZmluZWQge1xuICByZXR1cm4gY2xlYW5lZENoYWxsZW5nZXNNYXAuZ2V0KGlkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRDYWNoZSAoKTogdm9pZCB7XG4gIHByb3ZpZGVyLmZvcmNlVXBkYXRlKClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNoYWxsZW5nZSAoY2hhbGw6IENoYWxsZW5nZSk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBwcm92aWRlci51cGRhdGVDaGFsbGVuZ2UoY2hhbGwpXG4gIGF3YWl0IHB1Ymxpc2hDaGFsbFVwZGF0ZSgpXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVDaGFsbGVuZ2UgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgcHJvdmlkZXIuZGVsZXRlQ2hhbGxlbmdlKGlkKVxuICBhd2FpdCBwdWJsaXNoQ2hhbGxVcGRhdGUoKVxufVxuIl19