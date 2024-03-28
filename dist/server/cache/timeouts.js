"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChallengeType = exports.checkRateLimit = exports.types = void 0;
const util_1 = require("util");
const client_1 = __importDefault(require("./client"));
const redisScript = util_1.promisify(client_1.default.script.bind(client_1.default));
const redisEvalsha = util_1.promisify(client_1.default.evalsha.bind(client_1.default));
const rateLimitScript = redisScript('load', `
  local newValue = tonumber(redis.call("INCR", KEYS[1]))
  if newValue > tonumber(ARGV[1]) then
    return redis.call("PTTL", KEYS[1])
  end
  if newValue == 1 then
    redis.call("PEXPIRE", KEYS[1], ARGV[2])
  end
`);
exports.types = {
    FLAG: 'FLAG',
    UPDATE_PROFILE: 'UPDATE_PROFILE'
};
/*
* The method does two things, but is in one database call for performance reasons. Rate limiting
* will be called frequently.
*
* First, the the method checks if the number of events meets the limit.
* If so, it resolves to an object with the `ok` key set to false, and `timeLeft` set
* to the number of milliseconds left until the bucket expires and new requests can be sent.
* Otherwise, the method will resolve to an object with the `ok` key set to true.
*/
exports.checkRateLimit = async ({ type, userid, duration, limit }) => {
    const bucketKey = `rl:${type}:${userid}`;
    const result = await redisEvalsha(await rateLimitScript, 1, bucketKey, limit, duration);
    return {
        ok: result === null,
        timeLeft: result
    };
};
exports.getChallengeType = (name) => {
    return `${exports.types.FLAG}:${name}`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZW91dHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvY2FjaGUvdGltZW91dHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0JBQWdDO0FBQ2hDLHNEQUE2QjtBQUU3QixNQUFNLFdBQVcsR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUN6RCxNQUFNLFlBQVksR0FBRyxnQkFBUyxDQUFDLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUMsQ0FBQTtBQUUzRCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFOzs7Ozs7OztDQVEzQyxDQUFDLENBQUE7QUFFVyxRQUFBLEtBQUssR0FBRztJQUNuQixJQUFJLEVBQUUsTUFBTTtJQUNaLGNBQWMsRUFBRSxnQkFBZ0I7Q0FDakMsQ0FBQTtBQUVEOzs7Ozs7OztFQVFFO0FBQ1csUUFBQSxjQUFjLEdBQUcsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtJQUN4RSxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQTtJQUN4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FDL0IsTUFBTSxlQUFlLEVBQ3JCLENBQUMsRUFDRCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFFBQVEsQ0FDVCxDQUFBO0lBQ0QsT0FBTztRQUNMLEVBQUUsRUFBRSxNQUFNLEtBQUssSUFBSTtRQUNuQixRQUFRLEVBQUUsTUFBTTtLQUNqQixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRVksUUFBQSxnQkFBZ0IsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ3ZDLE9BQU8sR0FBRyxhQUFLLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFBO0FBQ2hDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gJ3V0aWwnXG5pbXBvcnQgY2xpZW50IGZyb20gJy4vY2xpZW50J1xuXG5jb25zdCByZWRpc1NjcmlwdCA9IHByb21pc2lmeShjbGllbnQuc2NyaXB0LmJpbmQoY2xpZW50KSlcbmNvbnN0IHJlZGlzRXZhbHNoYSA9IHByb21pc2lmeShjbGllbnQuZXZhbHNoYS5iaW5kKGNsaWVudCkpXG5cbmNvbnN0IHJhdGVMaW1pdFNjcmlwdCA9IHJlZGlzU2NyaXB0KCdsb2FkJywgYFxuICBsb2NhbCBuZXdWYWx1ZSA9IHRvbnVtYmVyKHJlZGlzLmNhbGwoXCJJTkNSXCIsIEtFWVNbMV0pKVxuICBpZiBuZXdWYWx1ZSA+IHRvbnVtYmVyKEFSR1ZbMV0pIHRoZW5cbiAgICByZXR1cm4gcmVkaXMuY2FsbChcIlBUVExcIiwgS0VZU1sxXSlcbiAgZW5kXG4gIGlmIG5ld1ZhbHVlID09IDEgdGhlblxuICAgIHJlZGlzLmNhbGwoXCJQRVhQSVJFXCIsIEtFWVNbMV0sIEFSR1ZbMl0pXG4gIGVuZFxuYClcblxuZXhwb3J0IGNvbnN0IHR5cGVzID0ge1xuICBGTEFHOiAnRkxBRycsXG4gIFVQREFURV9QUk9GSUxFOiAnVVBEQVRFX1BST0ZJTEUnXG59XG5cbi8qXG4qIFRoZSBtZXRob2QgZG9lcyB0d28gdGhpbmdzLCBidXQgaXMgaW4gb25lIGRhdGFiYXNlIGNhbGwgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuIFJhdGUgbGltaXRpbmdcbiogd2lsbCBiZSBjYWxsZWQgZnJlcXVlbnRseS5cbipcbiogRmlyc3QsIHRoZSB0aGUgbWV0aG9kIGNoZWNrcyBpZiB0aGUgbnVtYmVyIG9mIGV2ZW50cyBtZWV0cyB0aGUgbGltaXQuXG4qIElmIHNvLCBpdCByZXNvbHZlcyB0byBhbiBvYmplY3Qgd2l0aCB0aGUgYG9rYCBrZXkgc2V0IHRvIGZhbHNlLCBhbmQgYHRpbWVMZWZ0YCBzZXRcbiogdG8gdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgbGVmdCB1bnRpbCB0aGUgYnVja2V0IGV4cGlyZXMgYW5kIG5ldyByZXF1ZXN0cyBjYW4gYmUgc2VudC5cbiogT3RoZXJ3aXNlLCB0aGUgbWV0aG9kIHdpbGwgcmVzb2x2ZSB0byBhbiBvYmplY3Qgd2l0aCB0aGUgYG9rYCBrZXkgc2V0IHRvIHRydWUuXG4qL1xuZXhwb3J0IGNvbnN0IGNoZWNrUmF0ZUxpbWl0ID0gYXN5bmMgKHsgdHlwZSwgdXNlcmlkLCBkdXJhdGlvbiwgbGltaXQgfSkgPT4ge1xuICBjb25zdCBidWNrZXRLZXkgPSBgcmw6JHt0eXBlfToke3VzZXJpZH1gXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlZGlzRXZhbHNoYShcbiAgICBhd2FpdCByYXRlTGltaXRTY3JpcHQsXG4gICAgMSxcbiAgICBidWNrZXRLZXksXG4gICAgbGltaXQsXG4gICAgZHVyYXRpb25cbiAgKVxuICByZXR1cm4ge1xuICAgIG9rOiByZXN1bHQgPT09IG51bGwsXG4gICAgdGltZUxlZnQ6IHJlc3VsdFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDaGFsbGVuZ2VUeXBlID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIGAke3R5cGVzLkZMQUd9OiR7bmFtZX1gXG59XG4iXX0=