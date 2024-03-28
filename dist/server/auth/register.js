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
exports.register = void 0;
const uuid_1 = require("uuid");
const users_1 = require("../database/users");
const token_1 = require("./token");
const responses_1 = require("../responses");
const paranoia = __importStar(require("../paranoia"));
exports.register = async ({ division, email, name, ctftimeId }, ip) => {
    const userUuid = uuid_1.v4();
    try {
        const user = await users_1.makeUser({
            division,
            email,
            name,
            id: userUuid,
            ctftimeId,
            perms: 0
        });
        await paranoia.register(user, ip);
    }
    catch (e) {
        if (e instanceof Object) {
            const { constraint } = e;
            if (constraint === 'users_ctftime_id_key') {
                return responses_1.responses.badKnownCtftimeId;
            }
            if (constraint === 'users_email_key') {
                return responses_1.responses.badKnownEmail;
            }
            if (constraint === 'users_name_key') {
                return responses_1.responses.badKnownName;
            }
        }
        throw e;
    }
    const authToken = await token_1.getToken(token_1.tokenKinds.auth, userUuid);
    return [responses_1.responses.goodRegister, { authToken }];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvYXV0aC9yZWdpc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQW1DO0FBQ25DLDZDQUFrRDtBQUNsRCxtQ0FBOEM7QUFDOUMsNENBQXdDO0FBRXhDLHNEQUF1QztBQUUxQixRQUFBLFFBQVEsR0FBRyxLQUFLLEVBQzNCLEVBQ0UsUUFBUSxFQUNSLEtBQUssRUFDTCxJQUFJLEVBQ0osU0FBUyxFQUMrQyxFQUMxRCxFQUFXLEVBSVgsRUFBRTtJQUNGLE1BQU0sUUFBUSxHQUFHLFNBQU0sRUFBRSxDQUFBO0lBQ3pCLElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLGdCQUFRLENBQUM7WUFDMUIsUUFBUTtZQUNSLEtBQUs7WUFDTCxJQUFJO1lBQ0osRUFBRSxFQUFFLFFBQVE7WUFDWixTQUFTO1lBQ1QsS0FBSyxFQUFFLENBQUM7U0FDVCxDQUFDLENBQUE7UUFFRixNQUFNLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0tBQ2xDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixJQUFJLENBQUMsWUFBWSxNQUFNLEVBQUU7WUFDdkIsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQTRCLENBQUE7WUFDbkQsSUFBSSxVQUFVLEtBQUssc0JBQXNCLEVBQUU7Z0JBQ3pDLE9BQU8scUJBQVMsQ0FBQyxpQkFBaUIsQ0FBQTthQUNuQztZQUNELElBQUksVUFBVSxLQUFLLGlCQUFpQixFQUFFO2dCQUNwQyxPQUFPLHFCQUFTLENBQUMsYUFBYSxDQUFBO2FBQy9CO1lBQ0QsSUFBSSxVQUFVLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQ25DLE9BQU8scUJBQVMsQ0FBQyxZQUFZLENBQUE7YUFDOUI7U0FDRjtRQUNELE1BQU0sQ0FBQyxDQUFBO0tBQ1I7SUFDRCxNQUFNLFNBQVMsR0FBRyxNQUFNLGdCQUFRLENBQUMsa0JBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDM0QsT0FBTyxDQUFDLHFCQUFTLENBQUMsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtBQUNoRCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJ1xuaW1wb3J0IHsgbWFrZVVzZXIsIFVzZXIgfSBmcm9tICcuLi9kYXRhYmFzZS91c2VycydcbmltcG9ydCB7IGdldFRva2VuLCB0b2tlbktpbmRzIH0gZnJvbSAnLi90b2tlbidcbmltcG9ydCB7IHJlc3BvbnNlcyB9IGZyb20gJy4uL3Jlc3BvbnNlcydcbmltcG9ydCB7IFZhbHVlT2YgfSBmcm9tICd0eXBlLWZlc3QnXG5pbXBvcnQgKiBhcyBwYXJhbm9pYSBmcm9tICcuLi9wYXJhbm9pYSdcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyID0gYXN5bmMgKFxuICB7XG4gICAgZGl2aXNpb24sXG4gICAgZW1haWwsXG4gICAgbmFtZSxcbiAgICBjdGZ0aW1lSWRcbiAgfTogUGljazxVc2VyLCAnZGl2aXNpb24nIHwgJ2VtYWlsJyB8ICduYW1lJyB8ICdjdGZ0aW1lSWQnPixcbiAgaXAgOiBzdHJpbmdcbik6IFByb21pc2U8XG4gIHwgW3R5cGVvZiByZXNwb25zZXMuZ29vZFJlZ2lzdGVyLCB7IGF1dGhUb2tlbjogc3RyaW5nIH1dXG4gIHwgVmFsdWVPZjx0eXBlb2YgcmVzcG9uc2VzPlxuPiA9PiB7XG4gIGNvbnN0IHVzZXJVdWlkID0gdXVpZHY0KClcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgbWFrZVVzZXIoe1xuICAgICAgZGl2aXNpb24sXG4gICAgICBlbWFpbCxcbiAgICAgIG5hbWUsXG4gICAgICBpZDogdXNlclV1aWQsXG4gICAgICBjdGZ0aW1lSWQsXG4gICAgICBwZXJtczogMFxuICAgIH0pXG5cbiAgICBhd2FpdCBwYXJhbm9pYS5yZWdpc3Rlcih1c2VyLCBpcClcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjb25zdCB7IGNvbnN0cmFpbnQgfSA9IGUgYXMgeyBjb25zdHJhaW50Pzogc3RyaW5nIH1cbiAgICAgIGlmIChjb25zdHJhaW50ID09PSAndXNlcnNfY3RmdGltZV9pZF9rZXknKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkS25vd25DdGZ0aW1lSWRcbiAgICAgIH1cbiAgICAgIGlmIChjb25zdHJhaW50ID09PSAndXNlcnNfZW1haWxfa2V5Jykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZEtub3duRW1haWxcbiAgICAgIH1cbiAgICAgIGlmIChjb25zdHJhaW50ID09PSAndXNlcnNfbmFtZV9rZXknKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZXMuYmFkS25vd25OYW1lXG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IGVcbiAgfVxuICBjb25zdCBhdXRoVG9rZW4gPSBhd2FpdCBnZXRUb2tlbih0b2tlbktpbmRzLmF1dGgsIHVzZXJVdWlkKVxuICByZXR1cm4gW3Jlc3BvbnNlcy5nb29kUmVnaXN0ZXIsIHsgYXV0aFRva2VuIH1dXG59XG4iXX0=