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
const uuid_1 = require("uuid");
const email_validator_1 = __importDefault(require("email-validator"));
const database = __importStar(require("../../../database"));
const responses_1 = require("../../../responses");
const util = __importStar(require("../../../util"));
const server_1 = __importDefault(require("../../../config/server"));
exports.default = {
    method: 'POST',
    path: '/users/me/members',
    requireAuth: true,
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string'
                }
            },
            required: ['email']
        }
    },
    handler: async ({ req, user }) => {
        if (!server_1.default.userMembers) {
            return responses_1.responses.badEndpoint;
        }
        const email = util.normalize.normalizeEmail(req.body.email);
        if (!email_validator_1.default.validate(email)) {
            return responses_1.responses.badEmail;
        }
        const id = uuid_1.v4();
        try {
            const data = await database.members.makeMember({
                id,
                userid: user.id,
                email
            });
            return [responses_1.responses.goodMemberCreate, data];
        }
        catch (e) {
            if (e.constraint === 'user_members_email_key') {
                return responses_1.responses.badKnownEmail;
            }
            throw e;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2VydmVyL2FwaS91c2Vycy9tZW1iZXJzL25ldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBbUM7QUFDbkMsc0VBQTRDO0FBQzVDLDREQUE2QztBQUM3QyxrREFBOEM7QUFDOUMsb0RBQXFDO0FBQ3JDLG9FQUEyQztBQUUzQyxrQkFBZTtJQUNiLE1BQU0sRUFBRSxNQUFNO0lBQ2QsSUFBSSxFQUFFLG1CQUFtQjtJQUN6QixXQUFXLEVBQUUsSUFBSTtJQUNqQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUNwQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQy9CLElBQUksQ0FBQyxnQkFBTSxDQUFDLFdBQVcsRUFBRTtZQUN2QixPQUFPLHFCQUFTLENBQUMsV0FBVyxDQUFBO1NBQzdCO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzRCxJQUFJLENBQUMseUJBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxxQkFBUyxDQUFDLFFBQVEsQ0FBQTtTQUMxQjtRQUVELE1BQU0sRUFBRSxHQUFHLFNBQU0sRUFBRSxDQUFBO1FBQ25CLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2dCQUM3QyxFQUFFO2dCQUNGLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDZixLQUFLO2FBQ04sQ0FBQyxDQUFBO1lBRUYsT0FBTyxDQUFDLHFCQUFTLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDMUM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLFVBQVUsS0FBSyx3QkFBd0IsRUFBRTtnQkFDN0MsT0FBTyxxQkFBUyxDQUFDLGFBQWEsQ0FBQTthQUMvQjtZQUVELE1BQU0sQ0FBQyxDQUFBO1NBQ1I7SUFDSCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXG5pbXBvcnQgZW1haWxWYWxpZGF0b3IgZnJvbSAnZW1haWwtdmFsaWRhdG9yJ1xuaW1wb3J0ICogYXMgZGF0YWJhc2UgZnJvbSAnLi4vLi4vLi4vZGF0YWJhc2UnXG5pbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4uLy4uLy4uL3V0aWwnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZy9zZXJ2ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kOiAnUE9TVCcsXG4gIHBhdGg6ICcvdXNlcnMvbWUvbWVtYmVycycsXG4gIHJlcXVpcmVBdXRoOiB0cnVlLFxuICBzY2hlbWE6IHtcbiAgICBib2R5OiB7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVxdWlyZWQ6IFsnZW1haWwnXVxuICAgIH1cbiAgfSxcbiAgaGFuZGxlcjogYXN5bmMgKHsgcmVxLCB1c2VyIH0pID0+IHtcbiAgICBpZiAoIWNvbmZpZy51c2VyTWVtYmVycykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRFbmRwb2ludFxuICAgIH1cblxuICAgIGNvbnN0IGVtYWlsID0gdXRpbC5ub3JtYWxpemUubm9ybWFsaXplRW1haWwocmVxLmJvZHkuZW1haWwpXG4gICAgaWYgKCFlbWFpbFZhbGlkYXRvci52YWxpZGF0ZShlbWFpbCkpIHtcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRW1haWxcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHV1aWR2NCgpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkYXRhYmFzZS5tZW1iZXJzLm1ha2VNZW1iZXIoe1xuICAgICAgICBpZCxcbiAgICAgICAgdXNlcmlkOiB1c2VyLmlkLFxuICAgICAgICBlbWFpbFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIFtyZXNwb25zZXMuZ29vZE1lbWJlckNyZWF0ZSwgZGF0YV1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5jb25zdHJhaW50ID09PSAndXNlcl9tZW1iZXJzX2VtYWlsX2tleScpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlcy5iYWRLbm93bkVtYWlsXG4gICAgICB9XG5cbiAgICAgIHRocm93IGVcbiAgICB9XG4gIH1cbn1cbiJdfQ==