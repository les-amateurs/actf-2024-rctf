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
const responses_1 = require("../../../responses");
const challenges = __importStar(require("../../../challenges"));
const perms_1 = __importDefault(require("../../../util/perms"));
exports.default = {
    method: 'GET',
    path: '/admin/challs',
    requireAuth: true,
    perms: perms_1.default.challsRead,
    handler: async () => {
        const challs = challenges.getAllChallenges();
        return [responses_1.responses.goodChallenges, challs];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NlcnZlci9hcGkvYWRtaW4vY2hhbGxzL2xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQThDO0FBQzlDLGdFQUFpRDtBQUNqRCxnRUFBdUM7QUFFdkMsa0JBQWU7SUFDYixNQUFNLEVBQUUsS0FBSztJQUNiLElBQUksRUFBRSxlQUFlO0lBQ3JCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLEtBQUssRUFBRSxlQUFLLENBQUMsVUFBVTtJQUN2QixPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbEIsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDNUMsT0FBTyxDQUFDLHFCQUFTLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQzNDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0ICogYXMgY2hhbGxlbmdlcyBmcm9tICcuLi8uLi8uLi9jaGFsbGVuZ2VzJ1xuaW1wb3J0IHBlcm1zIGZyb20gJy4uLy4uLy4uL3V0aWwvcGVybXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgcGF0aDogJy9hZG1pbi9jaGFsbHMnLFxuICByZXF1aXJlQXV0aDogdHJ1ZSxcbiAgcGVybXM6IHBlcm1zLmNoYWxsc1JlYWQsXG4gIGhhbmRsZXI6IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjaGFsbHMgPSBjaGFsbGVuZ2VzLmdldEFsbENoYWxsZW5nZXMoKVxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RDaGFsbGVuZ2VzLCBjaGFsbHNdXG4gIH1cbn1cbiJdfQ==