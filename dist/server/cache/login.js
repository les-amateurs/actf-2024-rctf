"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogin = exports.makeLogin = void 0;
const util_1 = require("util");
const server_1 = __importDefault(require("../config/server"));
const client_1 = __importDefault(require("./client"));
const redisSet = util_1.promisify(client_1.default.set.bind(client_1.default));
const redisDel = util_1.promisify(client_1.default.del.bind(client_1.default));
exports.makeLogin = async ({ id }) => {
    await redisSet(`login:${id}`, '0', 'px', server_1.default.loginTimeout);
};
exports.useLogin = async ({ id }) => {
    const result = await redisDel(`login:${id}`);
    return result === 1;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvY2FjaGUvbG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0JBQWdDO0FBQ2hDLDhEQUFxQztBQUNyQyxzREFBNkI7QUFFN0IsTUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLENBQUE7QUFDbkQsTUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLENBQUE7QUFFdEMsUUFBQSxTQUFTLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUN4QyxNQUFNLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUMvRCxDQUFDLENBQUE7QUFFWSxRQUFBLFFBQVEsR0FBRyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUM1QyxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUE7QUFDckIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL3NlcnZlcidcbmltcG9ydCBjbGllbnQgZnJvbSAnLi9jbGllbnQnXG5cbmNvbnN0IHJlZGlzU2V0ID0gcHJvbWlzaWZ5KGNsaWVudC5zZXQuYmluZChjbGllbnQpKVxuY29uc3QgcmVkaXNEZWwgPSBwcm9taXNpZnkoY2xpZW50LmRlbC5iaW5kKGNsaWVudCkpXG5cbmV4cG9ydCBjb25zdCBtYWtlTG9naW4gPSBhc3luYyAoeyBpZCB9KSA9PiB7XG4gIGF3YWl0IHJlZGlzU2V0KGBsb2dpbjoke2lkfWAsICcwJywgJ3B4JywgY29uZmlnLmxvZ2luVGltZW91dClcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUxvZ2luID0gYXN5bmMgKHsgaWQgfSkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCByZWRpc0RlbChgbG9naW46JHtpZH1gKVxuICByZXR1cm4gcmVzdWx0ID09PSAxXG59XG4iXX0=