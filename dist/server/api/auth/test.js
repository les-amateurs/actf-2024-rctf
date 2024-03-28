"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses_1 = require("../../responses");
exports.default = {
    method: 'GET',
    path: '/auth/test',
    requireAuth: true,
    handler: async () => {
        return responses_1.responses.goodToken;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvYXV0aC90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTJDO0FBRTNDLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLEtBQUs7SUFDYixJQUFJLEVBQUUsWUFBWTtJQUNsQixXQUFXLEVBQUUsSUFBSTtJQUNqQixPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbEIsT0FBTyxxQkFBUyxDQUFDLFNBQVMsQ0FBQTtJQUM1QixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc3BvbnNlcyB9IGZyb20gJy4uLy4uL3Jlc3BvbnNlcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdHRVQnLFxuICBwYXRoOiAnL2F1dGgvdGVzdCcsXG4gIHJlcXVpcmVBdXRoOiB0cnVlLFxuICBoYW5kbGVyOiBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIHJlc3BvbnNlcy5nb29kVG9rZW5cbiAgfVxufVxuIl19