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
const responses_1 = require("../../responses");
const database = __importStar(require("../../database"));
const server_1 = __importDefault(require("../../config/server"));
const timeouts = __importStar(require("../../cache/timeouts"));
const util = __importStar(require("../../util"));
const errors_1 = require("../../errors");
exports.default = {
    method: 'PATCH',
    path: '/users/me',
    requireAuth: true,
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                division: {
                    type: 'string',
                    enum: Object.keys(server_1.default.divisions)
                }
            }
        }
    },
    handler: async ({ user, req }) => {
        if (Date.now() > server_1.default.endTime) {
            return responses_1.responses.badEnded;
        }
        const uuid = user.id;
        const division = req.body.division || user.division;
        let name;
        if (req.body.name !== undefined) {
            name = util.normalize.normalizeName(req.body.name);
            if (!util.validate.validateName(name)) {
                return responses_1.responses.badName;
            }
            const passRateLimit = await timeouts.checkRateLimit({
                type: timeouts.types.UPDATE_PROFILE,
                userid: uuid,
                duration: 10 * 60 * 1000,
                limit: 1
            });
            // Rate limit name changes only
            if (!passRateLimit.ok) {
                return [responses_1.responses.badRateLimit, {
                        timeLeft: passRateLimit.timeLeft
                    }];
            }
        }
        let newUser;
        try {
            newUser = await database.users.updateUser({
                id: uuid,
                name,
                division,
                email: user.email
            });
        }
        catch (e) {
            if (e instanceof errors_1.DivisionACLError) {
                return responses_1.responses.badDivisionNotAllowed;
            }
            if (e.constraint === 'users_name_key') {
                return responses_1.responses.badKnownName;
            }
            throw e;
        }
        return [responses_1.responses.goodUserUpdate, {
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    division: newUser.division
                }
            }];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2VydmVyL2FwaS91c2Vycy91cGRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTJDO0FBQzNDLHlEQUEwQztBQUMxQyxpRUFBd0M7QUFDeEMsK0RBQWdEO0FBQ2hELGlEQUFrQztBQUNsQyx5Q0FBK0M7QUFFL0Msa0JBQWU7SUFDYixNQUFNLEVBQUUsT0FBTztJQUNmLElBQUksRUFBRSxXQUFXO0lBQ2pCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxTQUFTLENBQUM7aUJBQ3BDO2FBQ0Y7U0FDRjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQy9CLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLGdCQUFNLENBQUMsT0FBTyxFQUFFO1lBQy9CLE9BQU8scUJBQVMsQ0FBQyxRQUFRLENBQUE7U0FDMUI7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO1FBQ3BCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDbkQsSUFBSSxJQUFJLENBQUE7UUFFUixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8scUJBQVMsQ0FBQyxPQUFPLENBQUE7YUFDekI7WUFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLFFBQVEsQ0FBQyxjQUFjLENBQUM7Z0JBQ2xELElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLGNBQWM7Z0JBQ25DLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7Z0JBQ3hCLEtBQUssRUFBRSxDQUFDO2FBQ1QsQ0FBQyxDQUFBO1lBRUYsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFO2dCQUNyQixPQUFPLENBQUMscUJBQVMsQ0FBQyxZQUFZLEVBQUU7d0JBQzlCLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUTtxQkFDakMsQ0FBQyxDQUFBO2FBQ0g7U0FDRjtRQUVELElBQUksT0FBTyxDQUFBO1FBQ1gsSUFBSTtZQUNGLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUN4QyxFQUFFLEVBQUUsSUFBSTtnQkFDUixJQUFJO2dCQUNKLFFBQVE7Z0JBQ1IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ2xCLENBQUMsQ0FBQTtTQUNIO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSx5QkFBZ0IsRUFBRTtnQkFDakMsT0FBTyxxQkFBUyxDQUFDLHFCQUFxQixDQUFBO2FBQ3ZDO1lBQ0QsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLGdCQUFnQixFQUFFO2dCQUNyQyxPQUFPLHFCQUFTLENBQUMsWUFBWSxDQUFBO2FBQzlCO1lBQ0QsTUFBTSxDQUFDLENBQUE7U0FDUjtRQUVELE9BQU8sQ0FBQyxxQkFBUyxDQUFDLGNBQWMsRUFBRTtnQkFDaEMsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO29CQUNwQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7aUJBQzNCO2FBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgKiBhcyBkYXRhYmFzZSBmcm9tICcuLi8uLi9kYXRhYmFzZSdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL3NlcnZlcidcbmltcG9ydCAqIGFzIHRpbWVvdXRzIGZyb20gJy4uLy4uL2NhY2hlL3RpbWVvdXRzJ1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuLi8uLi91dGlsJ1xuaW1wb3J0IHsgRGl2aXNpb25BQ0xFcnJvciB9IGZyb20gJy4uLy4uL2Vycm9ycydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdQQVRDSCcsXG4gIHBhdGg6ICcvdXNlcnMvbWUnLFxuICByZXF1aXJlQXV0aDogdHJ1ZSxcbiAgc2NoZW1hOiB7XG4gICAgYm9keToge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBkaXZpc2lvbjoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIGVudW06IE9iamVjdC5rZXlzKGNvbmZpZy5kaXZpc2lvbnMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHVzZXIsIHJlcSB9KSA9PiB7XG4gICAgaWYgKERhdGUubm93KCkgPiBjb25maWcuZW5kVGltZSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRFbmRlZFxuICAgIH1cblxuICAgIGNvbnN0IHV1aWQgPSB1c2VyLmlkXG4gICAgY29uc3QgZGl2aXNpb24gPSByZXEuYm9keS5kaXZpc2lvbiB8fCB1c2VyLmRpdmlzaW9uXG4gICAgbGV0IG5hbWVcblxuICAgIGlmIChyZXEuYm9keS5uYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG5hbWUgPSB1dGlsLm5vcm1hbGl6ZS5ub3JtYWxpemVOYW1lKHJlcS5ib2R5Lm5hbWUpXG4gICAgICBpZiAoIXV0aWwudmFsaWRhdGUudmFsaWRhdGVOYW1lKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkTmFtZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXNzUmF0ZUxpbWl0ID0gYXdhaXQgdGltZW91dHMuY2hlY2tSYXRlTGltaXQoe1xuICAgICAgICB0eXBlOiB0aW1lb3V0cy50eXBlcy5VUERBVEVfUFJPRklMRSxcbiAgICAgICAgdXNlcmlkOiB1dWlkLFxuICAgICAgICBkdXJhdGlvbjogMTAgKiA2MCAqIDEwMDAsXG4gICAgICAgIGxpbWl0OiAxXG4gICAgICB9KVxuXG4gICAgICAvLyBSYXRlIGxpbWl0IG5hbWUgY2hhbmdlcyBvbmx5XG4gICAgICBpZiAoIXBhc3NSYXRlTGltaXQub2spIHtcbiAgICAgICAgcmV0dXJuIFtyZXNwb25zZXMuYmFkUmF0ZUxpbWl0LCB7XG4gICAgICAgICAgdGltZUxlZnQ6IHBhc3NSYXRlTGltaXQudGltZUxlZnRcbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbmV3VXNlclxuICAgIHRyeSB7XG4gICAgICBuZXdVc2VyID0gYXdhaXQgZGF0YWJhc2UudXNlcnMudXBkYXRlVXNlcih7XG4gICAgICAgIGlkOiB1dWlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBkaXZpc2lvbixcbiAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcbiAgICAgIH0pXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBEaXZpc2lvbkFDTEVycm9yKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRGl2aXNpb25Ob3RBbGxvd2VkXG4gICAgICB9XG4gICAgICBpZiAoZS5jb25zdHJhaW50ID09PSAndXNlcnNfbmFtZV9rZXknKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkS25vd25OYW1lXG4gICAgICB9XG4gICAgICB0aHJvdyBlXG4gICAgfVxuXG4gICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZFVzZXJVcGRhdGUsIHtcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgbmFtZTogbmV3VXNlci5uYW1lLFxuICAgICAgICBlbWFpbDogbmV3VXNlci5lbWFpbCxcbiAgICAgICAgZGl2aXNpb246IG5ld1VzZXIuZGl2aXNpb25cbiAgICAgIH1cbiAgICB9XVxuICB9XG59XG4iXX0=