"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses_1 = require("../../responses");
const util_1 = require("./util");
exports.default = {
    method: 'GET',
    path: '/users/:id',
    requireAuth: false,
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
        const userData = await util_1.getGenericUserData({
            id: req.params.id
        });
        if (userData === null)
            return responses_1.responses.badUnknownUser;
        return [responses_1.responses.goodUserData, userData];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL3VzZXJzL2lkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTJDO0FBQzNDLGlDQUEyQztBQUUzQyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBSSxFQUFFLFlBQVk7SUFDbEIsV0FBVyxFQUFFLEtBQUs7SUFDbEIsTUFBTSxFQUFFO1FBQ04sTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFO29CQUNGLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDakI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLE1BQU0seUJBQWtCLENBQUM7WUFDeEMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtTQUNsQixDQUFDLENBQUE7UUFFRixJQUFJLFFBQVEsS0FBSyxJQUFJO1lBQUUsT0FBTyxxQkFBUyxDQUFDLGNBQWMsQ0FBQTtRQUV0RCxPQUFPLENBQUMscUJBQVMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDM0MsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgeyBnZXRHZW5lcmljVXNlckRhdGEgfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnR0VUJyxcbiAgcGF0aDogJy91c2Vycy86aWQnLFxuICByZXF1aXJlQXV0aDogZmFsc2UsXG4gIHNjaGVtYToge1xuICAgIHBhcmFtczoge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbJ2lkJ11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCBnZXRHZW5lcmljVXNlckRhdGEoe1xuICAgICAgaWQ6IHJlcS5wYXJhbXMuaWRcbiAgICB9KVxuXG4gICAgaWYgKHVzZXJEYXRhID09PSBudWxsKSByZXR1cm4gcmVzcG9uc2VzLmJhZFVua25vd25Vc2VyXG5cbiAgICByZXR1cm4gW3Jlc3BvbnNlcy5nb29kVXNlckRhdGEsIHVzZXJEYXRhXVxuICB9XG59XG4iXX0=