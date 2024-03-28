"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../config/client"));
const responses_1 = require("../../../responses");
exports.default = {
    method: 'GET',
    path: '/integrations/client/config',
    requireAuth: false,
    handler: async () => {
        return [responses_1.responses.goodClientConfig, client_1.default];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9pbnRlZ3JhdGlvbnMvY2xpZW50L2NvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9FQUFpRDtBQUNqRCxrREFBOEM7QUFFOUMsa0JBQWU7SUFDYixNQUFNLEVBQUUsS0FBSztJQUNiLElBQUksRUFBRSw2QkFBNkI7SUFDbkMsV0FBVyxFQUFFLEtBQUs7SUFDbEIsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2xCLE9BQU8sQ0FBQyxxQkFBUyxDQUFDLGdCQUFnQixFQUFFLGdCQUFZLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbGllbnRDb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnL2NsaWVudCdcbmltcG9ydCB7IHJlc3BvbnNlcyB9IGZyb20gJy4uLy4uLy4uL3Jlc3BvbnNlcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdHRVQnLFxuICBwYXRoOiAnL2ludGVncmF0aW9ucy9jbGllbnQvY29uZmlnJyxcbiAgcmVxdWlyZUF1dGg6IGZhbHNlLFxuICBoYW5kbGVyOiBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZENsaWVudENvbmZpZywgY2xpZW50Q29uZmlnXVxuICB9XG59XG4iXX0=