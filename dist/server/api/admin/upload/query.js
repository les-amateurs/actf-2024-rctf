"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responses_1 = require("../../../responses");
const perms_1 = __importDefault(require("../../../util/perms"));
const uploads_1 = require("../../../uploads");
exports.default = {
    method: 'POST',
    path: '/admin/upload/query',
    requireAuth: true,
    perms: perms_1.default.challsRead,
    schema: {
        body: {
            type: 'object',
            properties: {
                uploads: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            sha256: {
                                type: 'string'
                            },
                            name: {
                                type: 'string'
                            }
                        },
                        required: ['sha256', 'name']
                    }
                }
            },
            required: ['uploads']
        }
    },
    handler: async ({ req }) => {
        const data = await Promise.all(req.body.uploads.map(async ({ sha256, name }) => {
            const url = await uploads_1.getUrl(sha256, name);
            return {
                sha256,
                name,
                url
            };
        }));
        return [responses_1.responses.goodUploadsQuery, data];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL2FkbWluL3VwbG9hZC9xdWVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUE4QztBQUM5QyxnRUFBdUM7QUFDdkMsOENBQXlDO0FBRXpDLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLE1BQU07SUFDZCxJQUFJLEVBQUUscUJBQXFCO0lBQzNCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLEtBQUssRUFBRSxlQUFLLENBQUMsVUFBVTtJQUN2QixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLE9BQU87b0JBQ2IsS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSxRQUFRO3dCQUNkLFVBQVUsRUFBRTs0QkFDVixNQUFNLEVBQUU7Z0NBQ04sSUFBSSxFQUFFLFFBQVE7NkJBQ2Y7NEJBQ0QsSUFBSSxFQUFFO2dDQUNKLElBQUksRUFBRSxRQUFROzZCQUNmO3lCQUNGO3dCQUNELFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7cUJBQzdCO2lCQUNGO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDdEI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzlDLE1BQU0sR0FBRyxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFdEMsT0FBTztnQkFDTCxNQUFNO2dCQUNOLElBQUk7Z0JBQ0osR0FBRzthQUNKLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFBO1FBRUQsT0FBTyxDQUFDLHFCQUFTLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDM0MsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgcGVybXMgZnJvbSAnLi4vLi4vLi4vdXRpbC9wZXJtcydcbmltcG9ydCB7IGdldFVybCB9IGZyb20gJy4uLy4uLy4uL3VwbG9hZHMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnUE9TVCcsXG4gIHBhdGg6ICcvYWRtaW4vdXBsb2FkL3F1ZXJ5JyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIHBlcm1zOiBwZXJtcy5jaGFsbHNSZWFkLFxuICBzY2hlbWE6IHtcbiAgICBib2R5OiB7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdXBsb2Fkczoge1xuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBzaGEyNTY6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBbJ3NoYTI1NicsICduYW1lJ11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogWyd1cGxvYWRzJ11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgcmVxLmJvZHkudXBsb2Fkcy5tYXAoYXN5bmMgKHsgc2hhMjU2LCBuYW1lIH0pID0+IHtcbiAgICAgICAgY29uc3QgdXJsID0gYXdhaXQgZ2V0VXJsKHNoYTI1NiwgbmFtZSlcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNoYTI1NixcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHVybFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcblxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RVcGxvYWRzUXVlcnksIGRhdGFdXG4gIH1cbn1cbiJdfQ==