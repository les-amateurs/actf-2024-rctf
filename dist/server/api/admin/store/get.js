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
    method: 'GET',
    path: '/admin/items/:id',
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
        const item = store.getItem(req.params.id);
        if (!item) {
            return responses_1.responses.badItem;
        }
        return [responses_1.responses.goodItems, item];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9hZG1pbi9zdG9yZS9nZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQThDO0FBQzlDLHNEQUF1QztBQUN2QyxnRUFBdUM7QUFFdkMsa0JBQWU7SUFDYixNQUFNLEVBQUUsS0FBSztJQUNiLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsV0FBVyxFQUFFLElBQUk7SUFDakIsS0FBSyxFQUFFLGVBQUssQ0FBQyxVQUFVO0lBQ3ZCLE1BQU0sRUFBRTtRQUNOLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLEVBQUUsRUFBRTtvQkFDRixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO1NBQ2pCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUN6QixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFekMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8scUJBQVMsQ0FBQyxPQUFPLENBQUE7U0FDekI7UUFFRCxPQUFPLENBQUMscUJBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDcEMsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgKiBhcyBzdG9yZSBmcm9tICcuLi8uLi8uLi9zdG9yZSdcbmltcG9ydCBwZXJtcyBmcm9tICcuLi8uLi8uLi91dGlsL3Blcm1zJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ0dFVCcsXG4gIHBhdGg6ICcvYWRtaW4vaXRlbXMvOmlkJyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIHBlcm1zOiBwZXJtcy5jaGFsbHNSZWFkLFxuICBzY2hlbWE6IHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBpZDoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogWydpZCddXG4gICAgfVxuICB9LFxuICBoYW5kbGVyOiBhc3luYyAoeyByZXEgfSkgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBzdG9yZS5nZXRJdGVtKHJlcS5wYXJhbXMuaWQpXG5cbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkSXRlbVxuICAgIH1cblxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RJdGVtcywgaXRlbV1cbiAgfVxufVxuIl19