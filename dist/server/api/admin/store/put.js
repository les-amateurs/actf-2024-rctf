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
    method: 'PUT',
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
        },
        body: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        },
                        type: {
                            type: 'string'
                        },
                        price: {
                            type: 'integer'
                        },
                        resourceUrl: {
                            type: 'string'
                        },
                        resourceName: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    handler: async ({ req }) => {
        const item = req.body.data;
        // Ensure id is consistent
        item.id = req.params.id;
        await store.updateItem(item);
        return [responses_1.responses.goodItemUpdate, item];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9hZG1pbi9zdG9yZS9wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQThDO0FBQzlDLHNEQUF1QztBQUV2QyxnRUFBdUM7QUFFdkMsa0JBQWU7SUFDYixNQUFNLEVBQUUsS0FBSztJQUNiLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsV0FBVyxFQUFFLElBQUk7SUFDakIsS0FBSyxFQUFFLGVBQUssQ0FBQyxXQUFXO0lBQ3hCLE1BQU0sRUFBRTtRQUNOLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLEVBQUUsRUFBRTtvQkFDRixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDVixJQUFJLEVBQUU7NEJBQ0osSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7d0JBQ0QsV0FBVyxFQUFFOzRCQUNYLElBQUksRUFBRSxRQUFRO3lCQUNmO3dCQUNELElBQUksRUFBRTs0QkFDSixJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxLQUFLLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFNBQVM7eUJBQ2hCO3dCQUNELFdBQVcsRUFBRTs0QkFDWCxJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxZQUFZLEVBQUU7NEJBQ1osSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUN6QixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUUxQiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUV2QixNQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFNUIsT0FBTyxDQUFDLHFCQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0ICogYXMgc3RvcmUgZnJvbSAnLi4vLi4vLi4vc3RvcmUnXG5cbmltcG9ydCBwZXJtcyBmcm9tICcuLi8uLi8uLi91dGlsL3Blcm1zJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ1BVVCcsXG4gIHBhdGg6ICcvYWRtaW4vaXRlbXMvOmlkJyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIHBlcm1zOiBwZXJtcy5jaGFsbHNXcml0ZSxcbiAgc2NoZW1hOiB7XG4gICAgcGFyYW1zOiB7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWQ6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFsnaWQnXVxuICAgIH0sXG4gICAgYm9keToge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpY2U6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzb3VyY2VVcmw6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNvdXJjZU5hbWU6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IHJlcS5ib2R5LmRhdGFcblxuICAgIC8vIEVuc3VyZSBpZCBpcyBjb25zaXN0ZW50XG4gICAgaXRlbS5pZCA9IHJlcS5wYXJhbXMuaWRcblxuICAgIGF3YWl0IHN0b3JlLnVwZGF0ZUl0ZW0oaXRlbSlcblxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RJdGVtVXBkYXRlLCBpdGVtXVxuICB9XG59XG4iXX0=