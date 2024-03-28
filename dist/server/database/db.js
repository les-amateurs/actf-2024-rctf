"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../config/server"));
const pg_1 = require("pg");
const creds = server_1.default.database.sql;
let pool;
// connection string
if (typeof creds === 'string') {
    pool = new pg_1.Pool({
        connectionString: creds
    });
}
else {
    pool = new pg_1.Pool(creds);
}
exports.default = pool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvZGF0YWJhc2UvZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBcUM7QUFDckMsMkJBQXlCO0FBRXpCLE1BQU0sS0FBSyxHQUFHLGdCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQTtBQUVqQyxJQUFJLElBQVUsQ0FBQTtBQUVkLG9CQUFvQjtBQUNwQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtJQUM3QixJQUFJLEdBQUcsSUFBSSxTQUFJLENBQUM7UUFDZCxnQkFBZ0IsRUFBRSxLQUFLO0tBQ3hCLENBQUMsQ0FBQTtDQUNIO0tBQU07SUFDTCxJQUFJLEdBQUcsSUFBSSxTQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7Q0FDdkI7QUFFRCxrQkFBZSxJQUFJLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXInXG5pbXBvcnQgeyBQb29sIH0gZnJvbSAncGcnXG5cbmNvbnN0IGNyZWRzID0gY29uZmlnLmRhdGFiYXNlLnNxbFxuXG5sZXQgcG9vbDogUG9vbFxuXG4vLyBjb25uZWN0aW9uIHN0cmluZ1xuaWYgKHR5cGVvZiBjcmVkcyA9PT0gJ3N0cmluZycpIHtcbiAgcG9vbCA9IG5ldyBQb29sKHtcbiAgICBjb25uZWN0aW9uU3RyaW5nOiBjcmVkc1xuICB9KVxufSBlbHNlIHtcbiAgcG9vbCA9IG5ldyBQb29sKGNyZWRzKVxufVxuXG5leHBvcnQgZGVmYXVsdCBwb29sXG4iXX0=