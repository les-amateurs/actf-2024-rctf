"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateName = void 0;
const nameRegex = /^[ -~]{2,64}$/;
exports.validateName = (name) => {
    return nameRegex.test(name);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvdXRpbC92YWxpZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUE7QUFFcEIsUUFBQSxZQUFZLEdBQUcsQ0FBQyxJQUFZLEVBQVcsRUFBRTtJQUNwRCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDN0IsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbmFtZVJlZ2V4ID0gL15bIC1+XXsyLDY0fSQvXG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZU5hbWUgPSAobmFtZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBuYW1lUmVnZXgudGVzdChuYW1lKVxufVxuIl19