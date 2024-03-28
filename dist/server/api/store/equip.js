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
    method: 'PUT',
    path: '/items/:id/equip',
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
        const res = await db.store.equipPurchase({ userid: user.id, itemid: req.params.id });
        if (res === undefined) {
            return responses_1.responses.badEquip;
        }
        return [responses_1.responses.goodEquip, res];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXF1aXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL3N0b3JlL2VxdWlwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFvQztBQUNwQywrQ0FBMkM7QUFFM0Msa0JBQWU7SUFDYixNQUFNLEVBQUUsS0FBSztJQUNiLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsV0FBVyxFQUFFLElBQUk7SUFDakIsTUFBTSxFQUFFO1FBQ04sTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFO29CQUNGLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDakI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUMvQixNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNwRixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDckIsT0FBTyxxQkFBUyxDQUFDLFFBQVEsQ0FBQTtTQUMxQjtRQUNELE9BQU8sQ0FBQyxxQkFBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRiIGZyb20gJy4uLy4uL2RhdGFiYXNlJ1xuaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vcmVzcG9uc2VzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ1BVVCcsXG4gIHBhdGg6ICcvaXRlbXMvOmlkL2VxdWlwJyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIHNjaGVtYToge1xuICAgIHBhcmFtczoge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbJ2lkJ11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSwgdXNlciB9KSA9PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZGIuc3RvcmUuZXF1aXBQdXJjaGFzZSh7IHVzZXJpZDogdXNlci5pZCwgaXRlbWlkOiByZXEucGFyYW1zLmlkIH0pXG4gICAgaWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZEVxdWlwXG4gICAgfVxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RFcXVpcCwgcmVzXVxuICB9XG59XG4iXX0=