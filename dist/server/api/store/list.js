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
const store = __importStar(require("../../store"));
exports.default = {
    method: 'GET',
    path: '/items',
    requireAuth: true,
    handler: async () => {
        const items = store.getAllItems();
        return [responses_1.responses.goodItems, items];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvc3RvcmUvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMkM7QUFDM0MsbURBQW9DO0FBRXBDLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLEtBQUs7SUFDYixJQUFJLEVBQUUsUUFBUTtJQUNkLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtRQUNsQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDakMsT0FBTyxDQUFDLHFCQUFTLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3JDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0ICogYXMgc3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgcGF0aDogJy9pdGVtcycsXG4gIHJlcXVpcmVBdXRoOiB0cnVlLFxuICBoYW5kbGVyOiBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaXRlbXMgPSBzdG9yZS5nZXRBbGxJdGVtcygpXG4gICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZEl0ZW1zLCBpdGVtc11cbiAgfVxufVxuIl19