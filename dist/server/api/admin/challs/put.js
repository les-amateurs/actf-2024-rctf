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
    method: 'PUT',
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
        },
        body: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        author: {
                            type: 'string'
                        },
                        category: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        },
                        flag: {
                            type: 'string'
                        },
                        name: {
                            type: 'string'
                        },
                        points: {
                            type: 'object',
                            properties: {
                                max: {
                                    type: 'integer'
                                },
                                min: {
                                    type: 'integer'
                                }
                            },
                            required: ['max', 'min']
                        },
                        tiebreakEligible: {
                            type: 'boolean'
                        },
                        files: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string'
                                    },
                                    url: {
                                        type: 'string'
                                    }
                                },
                                required: ['name', 'url']
                            }
                        }
                    }
                }
            }
        }
    },
    handler: async ({ req }) => {
        const chall = req.body.data;
        // Ensure id is consistent
        chall.id = req.params.id;
        await challenges.updateChallenge(chall);
        if (chall.points !== undefined) {
            await cache.leaderboard.setChallsDirty();
        }
        return [responses_1.responses.goodChallengeUpdate, chall];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS9hZG1pbi9jaGFsbHMvcHV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUE4QztBQUM5QyxnRUFBaUQ7QUFDakQsZ0VBQXVDO0FBQ3ZDLHNEQUF1QztBQUV2QyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBSSxFQUFFLG1CQUFtQjtJQUN6QixXQUFXLEVBQUUsSUFBSTtJQUNqQixLQUFLLEVBQUUsZUFBSyxDQUFDLFdBQVc7SUFDeEIsTUFBTSxFQUFFO1FBQ04sTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFO29CQUNGLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNWLE1BQU0sRUFBRTs0QkFDTixJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxRQUFRLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7d0JBQ0QsV0FBVyxFQUFFOzRCQUNYLElBQUksRUFBRSxRQUFRO3lCQUNmO3dCQUNELElBQUksRUFBRTs0QkFDSixJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxJQUFJLEVBQUU7NEJBQ0osSUFBSSxFQUFFLFFBQVE7eUJBQ2Y7d0JBQ0QsTUFBTSxFQUFFOzRCQUNOLElBQUksRUFBRSxRQUFROzRCQUNkLFVBQVUsRUFBRTtnQ0FDVixHQUFHLEVBQUU7b0NBQ0gsSUFBSSxFQUFFLFNBQVM7aUNBQ2hCO2dDQUNELEdBQUcsRUFBRTtvQ0FDSCxJQUFJLEVBQUUsU0FBUztpQ0FDaEI7NkJBQ0Y7NEJBQ0QsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQzt5QkFDekI7d0JBQ0QsZ0JBQWdCLEVBQUU7NEJBQ2hCLElBQUksRUFBRSxTQUFTO3lCQUNoQjt3QkFDRCxLQUFLLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLE9BQU87NEJBQ2IsS0FBSyxFQUFFO2dDQUNMLElBQUksRUFBRSxRQUFRO2dDQUNkLFVBQVUsRUFBRTtvQ0FDVixJQUFJLEVBQUU7d0NBQ0osSUFBSSxFQUFFLFFBQVE7cUNBQ2Y7b0NBQ0QsR0FBRyxFQUFFO3dDQUNILElBQUksRUFBRSxRQUFRO3FDQUNmO2lDQUNGO2dDQUNELFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7NkJBQzFCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDekIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7UUFFM0IsMEJBQTBCO1FBQzFCLEtBQUssQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFFeEIsTUFBTSxVQUFVLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDOUIsTUFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFBO1NBQ3pDO1FBRUQsT0FBTyxDQUFDLHFCQUFTLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDL0MsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgKiBhcyBjaGFsbGVuZ2VzIGZyb20gJy4uLy4uLy4uL2NoYWxsZW5nZXMnXG5pbXBvcnQgcGVybXMgZnJvbSAnLi4vLi4vLi4vdXRpbC9wZXJtcydcbmltcG9ydCAqIGFzIGNhY2hlIGZyb20gJy4uLy4uLy4uL2NhY2hlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZDogJ1BVVCcsXG4gIHBhdGg6ICcvYWRtaW4vY2hhbGxzLzppZCcsXG4gIHJlcXVpcmVBdXRoOiB0cnVlLFxuICBwZXJtczogcGVybXMuY2hhbGxzV3JpdGUsXG4gIHNjaGVtYToge1xuICAgIHBhcmFtczoge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlcXVpcmVkOiBbJ2lkJ11cbiAgICB9LFxuICAgIGJvZHk6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgYXV0aG9yOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZsYWc6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgbWF4OiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1pbjoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICByZXF1aXJlZDogWydtYXgnLCAnbWluJ11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aWVicmVha0VsaWdpYmxlOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbGVzOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHVybDoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFsnbmFtZScsICd1cmwnXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBoYW5kbGVyOiBhc3luYyAoeyByZXEgfSkgPT4ge1xuICAgIGNvbnN0IGNoYWxsID0gcmVxLmJvZHkuZGF0YVxuXG4gICAgLy8gRW5zdXJlIGlkIGlzIGNvbnNpc3RlbnRcbiAgICBjaGFsbC5pZCA9IHJlcS5wYXJhbXMuaWRcblxuICAgIGF3YWl0IGNoYWxsZW5nZXMudXBkYXRlQ2hhbGxlbmdlKGNoYWxsKVxuICAgIGlmIChjaGFsbC5wb2ludHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYXdhaXQgY2FjaGUubGVhZGVyYm9hcmQuc2V0Q2hhbGxzRGlydHkoKVxuICAgIH1cblxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RDaGFsbGVuZ2VVcGRhdGUsIGNoYWxsXVxuICB9XG59XG4iXX0=