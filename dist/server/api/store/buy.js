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
const db = __importStar(require("../../database"));
const responses_1 = require("../../responses");
exports.default = {
    method: 'POST',
    path: '/items/:id/buy',
    requireAuth: true,
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
    handler: async ({ req, user }) => {
        const item = await db.store.getItemById({ id: req.params.id });
        const userObj = await db.users.getUserById({ id: user.id });
        if (userObj.chips >= item.price) {
            try {
                return [
                    responses_1.responses.goodPurchase,
                    await db.store.buyItem(userObj.id, item)
                ];
            }
            catch (e) {
                if (e.constraint === 'already_owned') {
                    return responses_1.responses.badItemAlreadyOwned;
                }
                throw e;
            }
        }
        return responses_1.responses.badPurchase;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9zdG9yZS9idXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQW9DO0FBQ3BDLCtDQUEyQztBQUUzQyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxNQUFNO0lBQ2QsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixXQUFXLEVBQUUsSUFBSTtJQUNqQixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixFQUFFLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNqQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzlELE1BQU0sT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDM0QsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0IsSUFBSTtnQkFDRixPQUFPO29CQUNMLHFCQUFTLENBQUMsWUFBWTtvQkFDdEIsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQztpQkFDekMsQ0FBQTthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLGVBQWUsRUFBRTtvQkFDcEMsT0FBTyxxQkFBUyxDQUFDLG1CQUFtQixDQUFBO2lCQUNyQztnQkFFRCxNQUFNLENBQUMsQ0FBQTthQUNSO1NBQ0Y7UUFFRCxPQUFPLHFCQUFTLENBQUMsV0FBVyxDQUFBO0lBQzlCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vLi4vZGF0YWJhc2UnXG5pbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi9yZXNwb25zZXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnUE9TVCcsXG4gIHBhdGg6ICcvaXRlbXMvOmlkL2J1eScsXG4gIHJlcXVpcmVBdXRoOiB0cnVlLFxuICBzY2hlbWE6IHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBpZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogWydpZCddXG4gICAgfVxuICB9LFxuICBoYW5kbGVyOiBhc3luYyAoeyByZXEsIHVzZXIgfSkgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCBkYi5zdG9yZS5nZXRJdGVtQnlJZCh7IGlkOiByZXEucGFyYW1zLmlkIH0pXG4gICAgY29uc3QgdXNlck9iaiA9IGF3YWl0IGRiLnVzZXJzLmdldFVzZXJCeUlkKHsgaWQ6IHVzZXIuaWQgfSlcbiAgICBpZiAodXNlck9iai5jaGlwcyA+PSBpdGVtLnByaWNlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHJlc3BvbnNlcy5nb29kUHVyY2hhc2UsXG4gICAgICAgICAgYXdhaXQgZGIuc3RvcmUuYnV5SXRlbSh1c2VyT2JqLmlkLCBpdGVtKVxuICAgICAgICBdXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChlLmNvbnN0cmFpbnQgPT09ICdhbHJlYWR5X293bmVkJykge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkSXRlbUFscmVhZHlPd25lZFxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZXMuYmFkUHVyY2hhc2VcbiAgfVxufVxuIl19