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
const database = __importStar(require("../../database"));
const auth = __importStar(require("../../auth"));
const responses_1 = require("../../responses");
exports.default = {
    method: 'POST',
    path: '/auth/login',
    requireAuth: false,
    schema: {
        body: {
            type: 'object',
            properties: {
                teamToken: {
                    type: 'string'
                },
                ctftimeToken: {
                    type: 'string'
                }
            },
            oneOf: [{
                    required: ['teamToken']
                }, {
                    required: ['ctftimeToken']
                }]
        }
    },
    handler: async ({ req }) => {
        let user;
        if (req.body.ctftimeToken !== undefined) {
            const ctftimeData = await auth.token.getData(auth.token.tokenKinds.ctftimeAuth, req.body.ctftimeToken);
            if (ctftimeData === null) {
                return responses_1.responses.badCtftimeToken;
            }
            user = await database.users.getUserByCtftimeId({ ctftimeId: ctftimeData.ctftimeId });
        }
        else {
            const uuid = await auth.token.getData(auth.token.tokenKinds.team, req.body.teamToken);
            if (uuid === null) {
                return responses_1.responses.badTokenVerification;
            }
            user = await database.users.getUserById({ id: uuid });
        }
        if (user === undefined) {
            return responses_1.responses.badUnknownUser;
        }
        const authToken = await auth.token.getToken(auth.token.tokenKinds.auth, user.id);
        return [responses_1.responses.goodLogin, {
                authToken
            }];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL2F1dGgvbG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQTBDO0FBQzFDLGlEQUFrQztBQUNsQywrQ0FBMkM7QUFFM0Msa0JBQWU7SUFDYixNQUFNLEVBQUUsTUFBTTtJQUNkLElBQUksRUFBRSxhQUFhO0lBQ25CLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELEtBQUssRUFBRSxDQUFDO29CQUNOLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQztpQkFDeEIsRUFBRTtvQkFDRCxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQzNCLENBQUM7U0FDSDtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7UUFDekIsSUFBSSxJQUFJLENBQUE7UUFDUixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUN2QyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ3RHLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtnQkFDeEIsT0FBTyxxQkFBUyxDQUFDLGVBQWUsQ0FBQTthQUNqQztZQUNELElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7U0FDckY7YUFBTTtZQUNMLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDckYsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNqQixPQUFPLHFCQUFTLENBQUMsb0JBQW9CLENBQUE7YUFDdEM7WUFDRCxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1NBQ3REO1FBQ0QsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE9BQU8scUJBQVMsQ0FBQyxjQUFjLENBQUE7U0FDaEM7UUFDRCxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDaEYsT0FBTyxDQUFDLHFCQUFTLENBQUMsU0FBUyxFQUFFO2dCQUMzQixTQUFTO2FBQ1YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkYXRhYmFzZSBmcm9tICcuLi8uLi9kYXRhYmFzZSdcbmltcG9ydCAqIGFzIGF1dGggZnJvbSAnLi4vLi4vYXV0aCdcbmltcG9ydCB7IHJlc3BvbnNlcyB9IGZyb20gJy4uLy4uL3Jlc3BvbnNlcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdQT1NUJyxcbiAgcGF0aDogJy9hdXRoL2xvZ2luJyxcbiAgcmVxdWlyZUF1dGg6IGZhbHNlLFxuICBzY2hlbWE6IHtcbiAgICBib2R5OiB7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGVhbVRva2VuOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgY3RmdGltZVRva2VuOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uZU9mOiBbe1xuICAgICAgICByZXF1aXJlZDogWyd0ZWFtVG9rZW4nXVxuICAgICAgfSwge1xuICAgICAgICByZXF1aXJlZDogWydjdGZ0aW1lVG9rZW4nXVxuICAgICAgfV1cbiAgICB9XG4gIH0sXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgbGV0IHVzZXJcbiAgICBpZiAocmVxLmJvZHkuY3RmdGltZVRva2VuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGN0ZnRpbWVEYXRhID0gYXdhaXQgYXV0aC50b2tlbi5nZXREYXRhKGF1dGgudG9rZW4udG9rZW5LaW5kcy5jdGZ0aW1lQXV0aCwgcmVxLmJvZHkuY3RmdGltZVRva2VuKVxuICAgICAgaWYgKGN0ZnRpbWVEYXRhID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkQ3RmdGltZVRva2VuXG4gICAgICB9XG4gICAgICB1c2VyID0gYXdhaXQgZGF0YWJhc2UudXNlcnMuZ2V0VXNlckJ5Q3RmdGltZUlkKHsgY3RmdGltZUlkOiBjdGZ0aW1lRGF0YS5jdGZ0aW1lSWQgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdXVpZCA9IGF3YWl0IGF1dGgudG9rZW4uZ2V0RGF0YShhdXRoLnRva2VuLnRva2VuS2luZHMudGVhbSwgcmVxLmJvZHkudGVhbVRva2VuKVxuICAgICAgaWYgKHV1aWQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRUb2tlblZlcmlmaWNhdGlvblxuICAgICAgfVxuICAgICAgdXNlciA9IGF3YWl0IGRhdGFiYXNlLnVzZXJzLmdldFVzZXJCeUlkKHsgaWQ6IHV1aWQgfSlcbiAgICB9XG4gICAgaWYgKHVzZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRVbmtub3duVXNlclxuICAgIH1cbiAgICBjb25zdCBhdXRoVG9rZW4gPSBhd2FpdCBhdXRoLnRva2VuLmdldFRva2VuKGF1dGgudG9rZW4udG9rZW5LaW5kcy5hdXRoLCB1c2VyLmlkKVxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RMb2dpbiwge1xuICAgICAgYXV0aFRva2VuXG4gICAgfV1cbiAgfVxufVxuIl19