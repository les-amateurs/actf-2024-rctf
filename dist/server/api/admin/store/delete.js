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
const store = __importStar(require("../../../store"));
const perms_1 = __importDefault(require("../../../util/perms"));
exports.default = {
    method: 'DELETE',
    path: '/admin/items/:id',
    requireAuth: true,
    perms: perms_1.default.challsWrite,
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
        const chall = await store.deleteItem(req.params.id);
        return [responses_1.responses.goodItemDelete, chall];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9hZG1pbi9zdG9yZS9kZWxldGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQThDO0FBQzlDLHNEQUF1QztBQUN2QyxnRUFBdUM7QUFFdkMsa0JBQWU7SUFDYixNQUFNLEVBQUUsUUFBUTtJQUNoQixJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLEtBQUssRUFBRSxlQUFLLENBQUMsV0FBVztJQUN4QixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixFQUFFLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNqQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDekIsTUFBTSxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFbkQsT0FBTyxDQUFDLHFCQUFTLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzFDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0ICogYXMgc3RvcmUgZnJvbSAnLi4vLi4vLi4vc3RvcmUnXG5pbXBvcnQgcGVybXMgZnJvbSAnLi4vLi4vLi4vdXRpbC9wZXJtcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdERUxFVEUnLFxuICBwYXRoOiAnL2FkbWluL2l0ZW1zLzppZCcsXG4gIHJlcXVpcmVBdXRoOiB0cnVlLFxuICBwZXJtczogcGVybXMuY2hhbGxzV3JpdGUsXG4gIHNjaGVtYToge1xuICAgIHBhcmFtczoge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbJ2lkJ11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgY29uc3QgY2hhbGwgPSBhd2FpdCBzdG9yZS5kZWxldGVJdGVtKHJlcS5wYXJhbXMuaWQpXG5cbiAgICByZXR1cm4gW3Jlc3BvbnNlcy5nb29kSXRlbURlbGV0ZSwgY2hhbGxdXG4gIH1cbn1cbiJdfQ==