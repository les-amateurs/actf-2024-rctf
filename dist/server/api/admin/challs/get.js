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
    path: '/admin/challs/:id',
    requireAuth: true,
    perms: perms_1.default.challsRead,
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                }
            },
            required: ['id']
        }
    },
    handler: async ({ req }) => {
        const chall = challenges.getChallenge(req.params.id);
        if (!chall) {
            return responses_1.responses.badChallenge;
        }
        return [responses_1.responses.goodChallenges, chall];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9hZG1pbi9jaGFsbHMvZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUE4QztBQUM5QyxnRUFBaUQ7QUFDakQsZ0VBQXVDO0FBRXZDLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLEtBQUs7SUFDYixJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLEtBQUssRUFBRSxlQUFLLENBQUMsVUFBVTtJQUN2QixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixFQUFFLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNqQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDekIsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBRXBELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLHFCQUFTLENBQUMsWUFBWSxDQUFBO1NBQzlCO1FBRUQsT0FBTyxDQUFDLHFCQUFTLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzFDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0ICogYXMgY2hhbGxlbmdlcyBmcm9tICcuLi8uLi8uLi9jaGFsbGVuZ2VzJ1xuaW1wb3J0IHBlcm1zIGZyb20gJy4uLy4uLy4uL3V0aWwvcGVybXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgcGF0aDogJy9hZG1pbi9jaGFsbHMvOmlkJyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIHBlcm1zOiBwZXJtcy5jaGFsbHNSZWFkLFxuICBzY2hlbWE6IHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBpZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogWydpZCddXG4gICAgfVxuICB9LFxuICBoYW5kbGVyOiBhc3luYyAoeyByZXEgfSkgPT4ge1xuICAgIGNvbnN0IGNoYWxsID0gY2hhbGxlbmdlcy5nZXRDaGFsbGVuZ2UocmVxLnBhcmFtcy5pZClcblxuICAgIGlmICghY2hhbGwpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkQ2hhbGxlbmdlXG4gICAgfVxuXG4gICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZENoYWxsZW5nZXMsIGNoYWxsXVxuICB9XG59XG4iXX0=