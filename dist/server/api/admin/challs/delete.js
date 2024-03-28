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
const challenges = __importStar(require("../../../challenges"));
const perms_1 = __importDefault(require("../../../util/perms"));
const cache = __importStar(require("../../../cache"));
exports.default = {
    method: 'DELETE',
    path: '/admin/challs/:id',
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
        const chall = await challenges.deleteChallenge(req.params.id);
        await cache.leaderboard.setChallsDirty();
        return [responses_1.responses.goodChallengeDelete, chall];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9hZG1pbi9jaGFsbHMvZGVsZXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUE4QztBQUM5QyxnRUFBaUQ7QUFDakQsZ0VBQXVDO0FBQ3ZDLHNEQUF1QztBQUV2QyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLElBQUksRUFBRSxtQkFBbUI7SUFDekIsV0FBVyxFQUFFLElBQUk7SUFDakIsS0FBSyxFQUFFLGVBQUssQ0FBQyxXQUFXO0lBQ3hCLE1BQU0sRUFBRTtRQUNOLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLEVBQUUsRUFBRTtvQkFDRixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO1NBQ2pCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUN6QixNQUFNLEtBQUssR0FBRyxNQUFNLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUU3RCxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUE7UUFFeEMsT0FBTyxDQUFDLHFCQUFTLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDL0MsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgKiBhcyBjaGFsbGVuZ2VzIGZyb20gJy4uLy4uLy4uL2NoYWxsZW5nZXMnXG5pbXBvcnQgcGVybXMgZnJvbSAnLi4vLi4vLi4vdXRpbC9wZXJtcydcbmltcG9ydCAqIGFzIGNhY2hlIGZyb20gJy4uLy4uLy4uL2NhY2hlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ0RFTEVURScsXG4gIHBhdGg6ICcvYWRtaW4vY2hhbGxzLzppZCcsXG4gIHJlcXVpcmVBdXRoOiB0cnVlLFxuICBwZXJtczogcGVybXMuY2hhbGxzV3JpdGUsXG4gIHNjaGVtYToge1xuICAgIHBhcmFtczoge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbJ2lkJ11cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgY29uc3QgY2hhbGwgPSBhd2FpdCBjaGFsbGVuZ2VzLmRlbGV0ZUNoYWxsZW5nZShyZXEucGFyYW1zLmlkKVxuXG4gICAgYXdhaXQgY2FjaGUubGVhZGVyYm9hcmQuc2V0Q2hhbGxzRGlydHkoKVxuXG4gICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZENoYWxsZW5nZURlbGV0ZSwgY2hhbGxdXG4gIH1cbn1cbiJdfQ==