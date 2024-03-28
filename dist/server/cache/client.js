"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subClient = void 0;
const redis_1 = __importDefault(require("redis"));
const server_1 = __importDefault(require("../config/server"));
const creds = server_1.default.database.redis;
let client;
// connection string
if (typeof creds === 'string') {
    client = redis_1.default.createClient({
        url: creds
    });
}
else {
    const { host, port, password, database } = creds;
    client = redis_1.default.createClient({
        host,
        port,
        password,
        db: database
    });
}
const subClient = client.duplicate();
exports.subClient = subClient;
exports.default = client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL2NhY2hlL2NsaWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBeUI7QUFDekIsOERBQXFDO0FBRXJDLE1BQU0sS0FBSyxHQUFHLGdCQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQTtBQUVuQyxJQUFJLE1BQU0sQ0FBQTtBQUVWLG9CQUFvQjtBQUNwQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtJQUM3QixNQUFNLEdBQUcsZUFBSyxDQUFDLFlBQVksQ0FBQztRQUMxQixHQUFHLEVBQUUsS0FBSztLQUNYLENBQUMsQ0FBQTtDQUNIO0tBQU07SUFDTCxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFBO0lBRWhELE1BQU0sR0FBRyxlQUFLLENBQUMsWUFBWSxDQUFDO1FBQzFCLElBQUk7UUFDSixJQUFJO1FBQ0osUUFBUTtRQUNSLEVBQUUsRUFBRSxRQUFRO0tBQ2IsQ0FBQyxDQUFBO0NBQ0g7QUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUE7QUFFM0IsOEJBQVM7QUFDbEIsa0JBQWUsTUFBTSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZGlzIGZyb20gJ3JlZGlzJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcvc2VydmVyJ1xuXG5jb25zdCBjcmVkcyA9IGNvbmZpZy5kYXRhYmFzZS5yZWRpc1xuXG5sZXQgY2xpZW50XG5cbi8vIGNvbm5lY3Rpb24gc3RyaW5nXG5pZiAodHlwZW9mIGNyZWRzID09PSAnc3RyaW5nJykge1xuICBjbGllbnQgPSByZWRpcy5jcmVhdGVDbGllbnQoe1xuICAgIHVybDogY3JlZHNcbiAgfSlcbn0gZWxzZSB7XG4gIGNvbnN0IHsgaG9zdCwgcG9ydCwgcGFzc3dvcmQsIGRhdGFiYXNlIH0gPSBjcmVkc1xuXG4gIGNsaWVudCA9IHJlZGlzLmNyZWF0ZUNsaWVudCh7XG4gICAgaG9zdCxcbiAgICBwb3J0LFxuICAgIHBhc3N3b3JkLFxuICAgIGRiOiBkYXRhYmFzZVxuICB9KVxufVxuXG5jb25zdCBzdWJDbGllbnQgPSBjbGllbnQuZHVwbGljYXRlKClcblxuZXhwb3J0IHsgc3ViQ2xpZW50IH1cbmV4cG9ydCBkZWZhdWx0IGNsaWVudFxuIl19