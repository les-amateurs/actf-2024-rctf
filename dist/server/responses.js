"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = exports.responseList = void 0;
exports.responseList = {
    goodVerify: {
        status: 200,
        message: 'The email was verified.'
    },
    goodRegister: {
        status: 200,
        message: 'The user was created.'
    },
    goodLogin: {
        status: 200,
        message: 'The login was successful.'
    },
    goodVerifySent: {
        status: 200,
        message: 'The account verification email was sent.'
    },
    badEmail: {
        status: 400,
        message: 'The email address is malformed.'
    },
    badCompetitionNotAllowed: {
        status: 403,
        message: 'You are not allowed to join this CTF.'
    },
    badDivisionNotAllowed: {
        status: 403,
        message: 'You are not allowed to join this division.'
    },
    badEmailChangeDivision: {
        status: 403,
        message: 'You are not allowed to stay in your division with this email.'
    },
    badUnknownUser: {
        status: 404,
        message: 'The user does not exist.'
    },
    badUnknownEmail: {
        status: 404,
        message: 'The account does not exist.'
    },
    badKnownEmail: {
        status: 409,
        message: 'An account with this email already exists.'
    },
    badKnownName: {
        status: 409,
        message: 'An account with this name already exists.'
    },
    badName: {
        status: 400,
        message: 'The name should only use english letters, numbers, and symbols.'
    },
    badKnownCtftimeId: {
        status: 409,
        message: 'An account with this CTFtime ID already exists.'
    },
    goodLeaderboard: {
        status: 200,
        message: 'The leaderboard was retrieved.'
    },
    goodCtftimeLeaderboard: {
        status: 200,
        rawContentType: 'application/json'
    },
    goodCtftimeToken: {
        status: 200,
        message: 'The CTFtime token was created.'
    },
    goodCtftimeAuthSet: {
        status: 200,
        message: 'The CTFtime team was successfully updated.'
    },
    goodCtftimeRemoved: {
        status: 200,
        message: 'The CTFtime team was removed from the user.'
    },
    goodEmailSet: {
        status: 200,
        message: 'The email was successfully updated.'
    },
    goodEmailRemoved: {
        status: 200,
        message: 'The email address was removed from the user.'
    },
    badCtftimeNoExists: {
        status: 404,
        message: 'There is no CTFtime team associated with the user.'
    },
    badZeroAuth: {
        status: 409,
        message: 'At least one authentication method is required.'
    },
    badEmailNoExists: {
        status: 404,
        message: 'There is no email address associated with the user.'
    },
    badCtftimeCode: {
        status: 401,
        message: 'The CTFtime code is invalid.'
    },
    goodFlag: {
        status: 200,
        message: 'The flag is correct.'
    },
    badFlag: {
        status: 400,
        message: 'The flag was incorrect.'
    },
    badChallenge: {
        status: 404,
        message: 'The challenge could not be not found.'
    },
    badAlreadySolvedChallenge: {
        status: 409,
        message: 'The flag was already submitted'
    },
    goodToken: {
        status: 200,
        message: 'The authorization token is valid'
    },
    goodFilesUpload: {
        status: 200,
        message: 'The files were successfully uploaded'
    },
    goodUploadsQuery: {
        status: 200,
        message: 'The status of uploads was successfully queried'
    },
    badFilesUpload: {
        status: 500,
        message: 'The upload of files failed'
    },
    badDataUri: {
        status: 400,
        message: 'A data URI provided was malformed'
    },
    badBody: {
        status: 400,
        message: 'The request body does not meet requirements.'
    },
    badToken: {
        status: 401,
        message: 'The token provided is invalid.'
    },
    badTokenVerification: {
        status: 401,
        message: 'The token provided is invalid.'
    },
    badCtftimeToken: {
        status: 401,
        message: 'The CTFtime token provided is invalid.'
    },
    badJson: {
        status: 400,
        message: 'The request JSON body is malformed.'
    },
    badEndpoint: {
        status: 404,
        message: 'The request endpoint could not be found.'
    },
    badNotStarted: {
        status: 401,
        message: 'The CTF has not started yet.'
    },
    badEnded: {
        status: 401,
        message: 'The CTF has ended.'
    },
    badRateLimit: {
        status: 429,
        message: 'You are trying this too fast'
    },
    goodChallenges: {
        status: 200,
        message: 'The retrieval of challenges was successful.'
    },
    goodChallengeSolves: {
        status: 200,
        message: 'The challenges solves have been retreived.'
    },
    goodChallengeUpdate: {
        status: 200,
        message: 'Challenge successfully updated'
    },
    goodChallengeDelete: {
        status: 200,
        message: 'Challenge successfully deleted'
    },
    goodUserData: {
        status: 200,
        message: 'The user data was successfully retrieved.'
    },
    goodUserUpdate: {
        status: 200,
        message: 'Your account was successfully updated'
    },
    goodMemberCreate: {
        status: 200,
        message: 'Team member successfully created'
    },
    goodMemberDelete: {
        status: 200,
        message: 'Team member successfully deleted'
    },
    goodMemberData: {
        status: 200,
        message: 'The team member data was successfully retrieved'
    },
    badPerms: {
        status: 403,
        message: 'The user does not have required permissions.'
    },
    goodClientConfig: {
        status: 200,
        message: 'The client config was retrieved.'
    },
    badRecaptchaCode: {
        status: 401,
        message: 'The recaptcha code is invalid.'
    },
    errorInternal: {
        status: 500,
        message: 'An internal error occurred.'
    },
    badItem: {
        status: 404,
        message: 'This item could not be not found.'
    },
    goodItems: {
        status: 200,
        message: 'The retrieval of items was successful.'
    },
    goodItemDelete: {
        status: 200,
        message: 'Item successfully deleted'
    },
    goodItemUpdate: {
        status: 200,
        message: 'Item successfully updated'
    },
    goodPurchase: {
        status: 200,
        message: 'Item successfully bought'
    },
    badPurchase: {
        status: 402,
        message: 'Too poor!'
    },
    badItemAlreadyOwned: {
        status: 409,
        message: 'Item already owned'
    },
    goodEquip: {
        status: 200,
        message: 'Item sucessfully (un)equipped'
    },
    badEquip: {
        status: 404,
        message: 'You don\'t own this item'
    }
};
const responses = {};
exports.responses = responses;
Object.keys(exports.responseList).forEach((kind) => {
    responses[kind] = kind;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL3Jlc3BvbnNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFnQmEsUUFBQSxZQUFZLEdBQUc7SUFDMUIsVUFBVSxFQUFFO1FBQ1YsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUseUJBQXlCO0tBQ25DO0lBQ0QsWUFBWSxFQUFFO1FBQ1osTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsdUJBQXVCO0tBQ2pDO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsMkJBQTJCO0tBQ3JDO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsMENBQTBDO0tBQ3BEO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsaUNBQWlDO0tBQzNDO0lBQ0Qsd0JBQXdCLEVBQUU7UUFDeEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsdUNBQXVDO0tBQ2pEO0lBQ0QscUJBQXFCLEVBQUU7UUFDckIsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsNENBQTRDO0tBQ3REO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDdEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsK0RBQStEO0tBQ3pFO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsMEJBQTBCO0tBQ3BDO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsNkJBQTZCO0tBQ3ZDO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsNENBQTRDO0tBQ3REO0lBQ0QsWUFBWSxFQUFFO1FBQ1osTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsMkNBQTJDO0tB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bnQiOlsiaW1wb3J0IHsgTWVyZ2VFeGNsdXNpdmUgfSBmcm9tICd0eXBlLWZlc3QnXG5cbmludGVyZmFjZSBCYXNlUmVzcG9uc2VUeXBlIHtcbiAgc3RhdHVzOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIE5vcm1hbFJlc3BvbnNlVHlwZSBleHRlbmRzIEJhc2VSZXNwb25zZVR5cGUge1xuICBtZXNzYWdlOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIFJhd1Jlc3BvbnNlVHlwZSBleHRlbmRzIEJhc2VSZXNwb25zZVR5cGUge1xuICByYXdDb250ZW50VHlwZTogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFJlc3BvbnNlVHlwZSA9IE1lcmdlRXhjbHVzaXZlPE5vcm1hbFJlc3BvbnNlVHlwZSwgUmF3UmVzcG9uc2VUeXBlPlxuXG5leHBvcnQgY29uc3QgcmVzcG9uc2VMaXN0ID0ge1xuICBnb29kVmVyaWZ5OiB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgbWVzc2FnZTogJ1RoZSBlbWFpbCB3YXMgdmVyaWZpZWQuJ1xuICB9LFxuICBnb29kUmVnaXN0ZXI6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGhlIHVzZXIgd2FzIGNyZWF0ZWQuJ1xuICB9LFxuICBnb29kTG9naW46IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGhlIGxvZ2luIHdhcyBzdWNjZXNzZnVsLidcbiAgfSxcbiAgZ29vZFZlcmlmeVNlbnQ6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGhlIGFjY291bnQgdmVyaWZpY2F0aW9uIGVtYWlsIHdhcyBzZW50LidcbiAgfSxcbiAgYmFkRW1haWw6IHtcbiAgICBzdGF0dXM6IDQwMCxcbiAgICBtZXNzYWdlOiAnVGhlIGVtYWlsIGFkZHJlc3MgaXMgbWFsZm9ybWVkLidcbiAgfSxcbiAgYmFkQ29tcGV0aXRpb25Ob3RBbGxvd2VkOiB7XG4gICAgc3RhdHVzOiA0MDMsXG4gICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gam9pbiB0aGlzIENURi4nXG4gIH0sXG4gIGJhZERpdmlzaW9uTm90QWxsb3dlZDoge1xuICAgIHN0YXR1czogNDAzLFxuICAgIG1lc3NhZ2U6ICdZb3UgYXJlIG5vdCBhbGxvd2VkIHRvIGpvaW4gdGhpcyBkaXZpc2lvbi4nXG4gIH0sXG4gIGJhZEVtYWlsQ2hhbmdlRGl2aXNpb246IHtcbiAgICBzdGF0dXM6IDQwMyxcbiAgICBtZXNzYWdlOiAnWW91IGFyZSBub3QgYWxsb3dlZCB0byBzdGF5IGluIHlvdXIgZGl2aXNpb24gd2l0aCB0aGlzIGVtYWlsLidcbiAgfSxcbiAgYmFkVW5rbm93blVzZXI6IHtcbiAgICBzdGF0dXM6IDQwNCxcbiAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZG9lcyBub3QgZXhpc3QuJ1xuICB9LFxuICBiYWRVbmtub3duRW1haWw6IHtcbiAgICBzdGF0dXM6IDQwNCxcbiAgICBtZXNzYWdlOiAnVGhlIGFjY291bnQgZG9lcyBub3QgZXhpc3QuJ1xuICB9LFxuICBiYWRLbm93bkVtYWlsOiB7XG4gICAgc3RhdHVzOiA0MDksXG4gICAgbWVzc2FnZTogJ0FuIGFjY291bnQgd2l0aCB0aGlzIGVtYWlsIGFscmVhZHkgZXhpc3RzLidcbiAgfSxcbiAgYmFkS25vd25OYW1lOiB7XG4gICAgc3RhdHVzOiA0MDksXG4gICAgbWVzc2FnZTogJ0FuIGFjY291bnQgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHMuJ1xuICB9LFxuICBiYWROYW1lOiB7XG4gICAgc3RhdHVzOiA0MDAsXG4gICAgbWVzc2FnZTogJ1RoZSBuYW1lIHNob3VsZCBvbmx5IHVzZSBlbmdsaXNoIGxldHRlcnMsIG51bWJlcnMsIGFuZCBzeW1ib2xzLidcbiAgfSxcbiAgYmFkS25vd25DdGZ0aW1lSWQ6IHtcbiAgICBzdGF0dXM6IDQwOSxcbiAgICBtZXNzYWdlOiAnQW4gYWNjb3VudCB3aXRoIHRoaXMgQ1RGdGltZSBJRCBhbHJlYWR5IGV4aXN0cy4nXG4gIH0sXG4gIGdvb2RMZWFkZXJib2FyZDoge1xuICAgIHN0YXR1czogMjAwLFxuICAgIG1lc3NhZ2U6ICdUaGUgbGVhZGVyYm9hcmQgd2FzIHJldHJpZXZlZC4nXG4gIH0sXG4gIGdvb2RDdGZ0aW1lTGVhZGVyYm9hcmQ6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICByYXdDb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXG4gIH0sXG4gIGdvb2RDdGZ0aW1lVG9rZW46IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGhlIENURnRpbWUgdG9rZW4gd2FzIGNyZWF0ZWQuJ1xuICB9LFxuICBnb29kQ3RmdGltZUF1dGhTZXQ6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGhlIENURnRpbWUgdGVhbSB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQuJ1xuICB9LFxuICBnb29kQ3RmdGltZVJlbW92ZWQ6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGhlIENURnRpbWUgdGVhbSB3YXMgcmVtb3ZlZCBmcm9tIHRoZSB1c2VyLidcbiAgfSxcbiAgZ29vZEVtYWlsU2V0OiB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgbWVzc2FnZTogJ1RoZSBlbWFpbCB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQuJ1xuICB9LFxuICBnb29kRW1haWxSZW1vdmVkOiB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgbWVzc2FnZTogJ1RoZSBlbWFpbCBhZGRyZXNzIHdhcyByZW1vdmVkIGZyb20gdGhlIHVzZXIuJ1xuICB9LFxuICBiYWRDdGZ0aW1lTm9FeGlzdHM6IHtcbiAgICBzdGF0dXM6IDQwNCxcbiAgICBtZXNzYWdlOiAnVGhlcmUgaXMgbm8gQ1RGdGltZSB0ZWFtIGFzc29jaWF0ZWQgd2l0aCB0aGUgdXNlci4nXG4gIH0sXG4gIGJhZFplcm9BdXRoOiB7XG4gICAgc3RhdHVzOiA0MDksXG4gICAgbWVzc2FnZTogJ0F0IGxlYXN0IG9uZSBhdXRoZW50aWNhdGlvbiBtZXRob2QgaXMgcmVxdWlyZWQuJ1xuICB9LFxuICBiYWRFbWFpbE5vRXhpc3RzOiB7XG4gICAgc3RhdHVzOiA0MDQsXG4gICAgbWVzc2FnZTogJ1RoZXJlIGlzIG5vIGVtYWlsIGFkZHJlc3MgYXNzb2NpYXRlZCB3aXRoIHRoZSB1c2VyLidcbiAgfSxcbiAgYmFkQ3RmdGltZUNvZGU6IHtcbiAgICBzdGF0dXM6IDQwMSxcbiAgICBtZXNzYWdlOiAnVGhlIENURnRpbWUgY29kZSBpcyBpbnZhbGlkLidcbiAgfSxcbiAgZ29vZEZsYWc6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGhlIGZsYWcgaXMgY29ycmVjdC4nXG4gIH0sXG4gIGJhZEZsYWc6IHtcbiAgICBzdGF0dXM6IDQwMCxcbiAgICBtZXNzYWdlOiAnVGhlIGZsYWcgd2FzIGluY29ycmVjdC4nXG4gIH0sXG4gIGJhZENoYWxsZW5nZToge1xuICAgIHN0YXR1czogNDA0LFxuICAgIG1lc3NhZ2U6ICdUaGUgY2hhbGxlbmdlIGNvdWxkIG5vdCBiZSBub3QgZm91bmQuJ1xuICB9LFxuICBiYWRBbHJlYWR5U29sdmVkQ2hhbGxlbmdlOiB7XG4gICAgc3RhdHVzOiA0MDksXG4gICAgbWVzc2FnZTogJ1RoZSBmbGFnIHdhcyBhbHJlYWR5IHN1Ym1pdHRlZCdcbiAgfSxcbiAgZ29vZFRva2VuOiB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgbWVzc2FnZTogJ1RoZSBhdXRob3JpemF0aW9uIHRva2VuIGlzIHZhbGlkJ1xuICB9LFxuICBnb29kRmlsZXNVcGxvYWQ6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGhlIGZpbGVzIHdlcmUgc3VjY2Vzc2Z1bGx5IHVwbG9hZGVkJ1xuICB9LFxuICBnb29kVXBsb2Fkc1F1ZXJ5OiB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgbWVzc2FnZTogJ1RoZSBzdGF0dXMgb2YgdXBsb2FkcyB3YXMgc3VjY2Vzc2Z1bGx5IHF1ZXJpZWQnXG4gIH0sXG4gIGJhZEZpbGVzVXBsb2FkOiB7XG4gICAgc3RhdHVzOiA1MDAsXG4gICAgbWVzc2FnZTogJ1RoZSB1cGxvYWQgb2YgZmlsZXMgZmFpbGVkJ1xuICB9LFxuICBiYWREYXRhVXJpOiB7XG4gICAgc3RhdHVzOiA0MDAsXG4gICAgbWVzc2FnZTogJ0EgZGF0YSBVUkkgcHJvdmlkZWQgd2FzIG1hbGZvcm1lZCdcbiAgfSxcbiAgYmFkQm9keToge1xuICAgIHN0YXR1czogNDAwLFxuICAgIG1lc3NhZ2U6ICdUaGUgcmVxdWVzdCBib2R5IGRvZXMgbm90IG1lZXQgcmVxdWlyZW1lbnRzLidcbiAgfSxcbiAgYmFkVG9rZW46IHtcbiAgICBzdGF0dXM6IDQwMSxcbiAgICBtZXNzYWdlOiAnVGhlIHRva2VuIHByb3ZpZGVkIGlzIGludmFsaWQuJ1xuICB9LFxuICBiYWRUb2tlblZlcmlmaWNhdGlvbjoge1xuICAgIHN0YXR1czogNDAxLFxuICAgIG1lc3NhZ2U6ICdUaGUgdG9rZW4gcHJvdmlkZWQgaXMgaW52YWxpZC4nXG4gIH0sXG4gIGJhZEN0ZnRpbWVUb2tlbjoge1xuICAgIHN0YXR1czogNDAxLFxuICAgIG1lc3NhZ2U6ICdUaGUgQ1RGdGltZSB0b2tlbiBwcm92aWRlZCBpcyBpbnZhbGlkLidcbiAgfSxcbiAgYmFkSnNvbjoge1xuICAgIHN0YXR1czogNDAwLFxuICAgIG1lc3NhZ2U6ICdUaGUgcmVxdWVzdCBKU09OIGJvZHkgaXMgbWFsZm9ybWVkLidcbiAgfSxcbiAgYmFkRW5kcG9pbnQ6IHtcbiAgICBzdGF0dXM6IDQwNCxcbiAgICBtZXNzYWdlOiAnVGhlIHJlcXVlc3QgZW5kcG9pbnQgY291bGQgbm90IGJlIGZvdW5kLidcbiAgfSxcbiAgYmFkTm90U3RhcnRlZDoge1xuICAgIHN0YXR1czogNDAxLFxuICAgIG1lc3NhZ2U6ICdUaGUgQ1RGIGhhcyBub3Qgc3RhcnRlZCB5ZXQuJ1xuICB9LFxuICBiYWRFbmRlZDoge1xuICAgIHN0YXR1czogNDAxLFxuICAgIG1lc3NhZ2U6ICdUaGUgQ1RGIGhhcyBlbmRlZC4nXG4gIH0sXG4gIGJhZFJhdGVMaW1pdDoge1xuICAgIHN0YXR1czogNDI5LFxuICAgIG1lc3NhZ2U6ICdZb3UgYXJlIHRyeWluZyB0aGlzIHRvbyBmYXN0J1xuICB9LFxuICBnb29kQ2hhbGxlbmdlczoge1xuICAgIHN0YXR1czogMjAwLFxuICAgIG1lc3NhZ2U6ICdUaGUgcmV0cmlldmFsIG9mIGNoYWxsZW5nZXMgd2FzIHN1Y2Nlc3NmdWwuJ1xuICB9LFxuICBnb29kQ2hhbGxlbmdlU29sdmVzOiB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgbWVzc2FnZTogJ1RoZSBjaGFsbGVuZ2VzIHNvbHZlcyBoYXZlIGJlZW4gcmV0cmVpdmVkLidcbiAgfSxcbiAgZ29vZENoYWxsZW5nZVVwZGF0ZToge1xuICAgIHN0YXR1czogMjAwLFxuICAgIG1lc3NhZ2U6ICdDaGFsbGVuZ2Ugc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQnXG4gIH0sXG4gIGdvb2RDaGFsbGVuZ2VEZWxldGU6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnQ2hhbGxlbmdlIHN1Y2Nlc3NmdWxseSBkZWxldGVkJ1xuICB9LFxuICBnb29kVXNlckRhdGE6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGhlIHVzZXIgZGF0YSB3YXMgc3VjY2Vzc2Z1bGx5IHJldHJpZXZlZC4nXG4gIH0sXG4gIGdvb2RVc2VyVXBkYXRlOiB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgbWVzc2FnZTogJ1lvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQnXG4gIH0sXG4gIGdvb2RNZW1iZXJDcmVhdGU6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGVhbSBtZW1iZXIgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnXG4gIH0sXG4gIGdvb2RNZW1iZXJEZWxldGU6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnVGVhbSBtZW1iZXIgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQnXG4gIH0sXG4gIGdvb2RNZW1iZXJEYXRhOiB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgbWVzc2FnZTogJ1RoZSB0ZWFtIG1lbWJlciBkYXRhIHdhcyBzdWNjZXNzZnVsbHkgcmV0cmlldmVkJ1xuICB9LFxuICBiYWRQZXJtczoge1xuICAgIHN0YXR1czogNDAzLFxuICAgIG1lc3NhZ2U6ICdUaGUgdXNlciBkb2VzIG5vdCBoYXZlIHJlcXVpcmVkIHBlcm1pc3Npb25zLidcbiAgfSxcbiAgZ29vZENsaWVudENvbmZpZzoge1xuICAgIHN0YXR1czogMjAwLFxuICAgIG1lc3NhZ2U6ICdUaGUgY2xpZW50IGNvbmZpZyB3YXMgcmV0cmlldmVkLidcbiAgfSxcbiAgYmFkUmVjYXB0Y2hhQ29kZToge1xuICAgIHN0YXR1czogNDAxLFxuICAgIG1lc3NhZ2U6ICdUaGUgcmVjYXB0Y2hhIGNvZGUgaXMgaW52YWxpZC4nXG4gIH0sXG4gIGVycm9ySW50ZXJuYWw6IHtcbiAgICBzdGF0dXM6IDUwMCxcbiAgICBtZXNzYWdlOiAnQW4gaW50ZXJuYWwgZXJyb3Igb2NjdXJyZWQuJ1xuICB9LFxuICBiYWRJdGVtOiB7XG4gICAgc3RhdHVzOiA0MDQsXG4gICAgbWVzc2FnZTogJ1RoaXMgaXRlbSBjb3VsZCBub3QgYmUgbm90IGZvdW5kLidcbiAgfSxcbiAgZ29vZEl0ZW1zOiB7XG4gICAgc3RhdHVzOiAyMDAsXG4gICAgbWVzc2FnZTogJ1RoZSByZXRyaWV2YWwgb2YgaXRlbXMgd2FzIHN1Y2Nlc3NmdWwuJ1xuICB9LFxuICBnb29kSXRlbURlbGV0ZToge1xuICAgIHN0YXR1czogMjAwLFxuICAgIG1lc3NhZ2U6ICdJdGVtIHN1Y2Nlc3NmdWxseSBkZWxldGVkJ1xuICB9LFxuICBnb29kSXRlbVVwZGF0ZToge1xuICAgIHN0YXR1czogMjAwLFxuICAgIG1lc3NhZ2U6ICdJdGVtIHN1Y2Nlc3NmdWxseSB1cGRhdGVkJ1xuICB9LFxuICBnb29kUHVyY2hhc2U6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnSXRlbSBzdWNjZXNzZnVsbHkgYm91Z2h0J1xuICB9LFxuICBiYWRQdXJjaGFzZToge1xuICAgIHN0YXR1czogNDAyLFxuICAgIG1lc3NhZ2U6ICdUb28gcG9vciEnXG4gIH0sXG4gIGJhZEl0ZW1BbHJlYWR5T3duZWQ6IHtcbiAgICBzdGF0dXM6IDQwOSxcbiAgICBtZXNzYWdlOiAnSXRlbSBhbHJlYWR5IG93bmVkJ1xuICB9LFxuICBnb29kRXF1aXA6IHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBtZXNzYWdlOiAnSXRlbSBzdWNlc3NmdWxseSAodW4pZXF1aXBwZWQnXG4gIH0sXG4gIGJhZEVxdWlwOiB7XG4gICAgc3RhdHVzOiA0MDQsXG4gICAgbWVzc2FnZTogJ1lvdSBkb25cXCd0IG93biB0aGlzIGl0ZW0nXG4gIH1cbn1cblxuY29uc3QgcmVzcG9uc2VzID0gPHsgW0sgaW4ga2V5b2YgdHlwZW9mIHJlc3BvbnNlTGlzdF06IEsgfT57fVxuT2JqZWN0LmtleXMocmVzcG9uc2VMaXN0KS5mb3JFYWNoKChraW5kKSA9PiB7XG4gIHJlc3BvbnNlc1traW5kIGFzIGtleW9mIHR5cGVvZiByZXNwb25zZUxpc3RdID0ga2luZCBhcyBuZXZlclxufSlcblxuZXhwb3J0IHsgcmVzcG9uc2VzIH1cbiJdfQ==