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
const responses_1 = require("../../../responses");
const perms_1 = __importDefault(require("../../../util/perms"));
const cache = __importStar(require("../../../cache"));
exports.default = {
    method: 'GET',
    path: '/integrations/ctftime/leaderboard',
    requireAuth: true,
    perms: perms_1.default.leaderboardRead,
    handler: async () => {
        const { leaderboard } = await cache.leaderboard.getRange({ all: true });
        const standings = leaderboard.map((user, i) => ({
            pos: i + 1,
            team: user.name,
            score: user.score
        }));
        return [responses_1.responses.goodCtftimeLeaderboard, JSON.stringify({ standings })];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvYXBpL2ludGVncmF0aW9ucy9jdGZ0aW1lL2xlYWRlcmJvYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUE4QztBQUM5QyxnRUFBdUM7QUFDdkMsc0RBQXVDO0FBRXZDLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLEtBQUs7SUFDYixJQUFJLEVBQUUsbUNBQW1DO0lBQ3pDLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLEtBQUssRUFBRSxlQUFLLENBQUMsZUFBZTtJQUM1QixPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbEIsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN2RSxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQyxDQUFDLENBQUE7UUFDSCxPQUFPLENBQUMscUJBQVMsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzFFLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzcG9uc2VzIH0gZnJvbSAnLi4vLi4vLi4vcmVzcG9uc2VzJ1xuaW1wb3J0IHBlcm1zIGZyb20gJy4uLy4uLy4uL3V0aWwvcGVybXMnXG5pbXBvcnQgKiBhcyBjYWNoZSBmcm9tICcuLi8uLi8uLi9jYWNoZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdHRVQnLFxuICBwYXRoOiAnL2ludGVncmF0aW9ucy9jdGZ0aW1lL2xlYWRlcmJvYXJkJyxcbiAgcmVxdWlyZUF1dGg6IHRydWUsXG4gIHBlcm1zOiBwZXJtcy5sZWFkZXJib2FyZFJlYWQsXG4gIGhhbmRsZXI6IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IGxlYWRlcmJvYXJkIH0gPSBhd2FpdCBjYWNoZS5sZWFkZXJib2FyZC5nZXRSYW5nZSh7IGFsbDogdHJ1ZSB9KVxuICAgIGNvbnN0IHN0YW5kaW5ncyA9IGxlYWRlcmJvYXJkLm1hcCgodXNlciwgaSkgPT4gKHtcbiAgICAgIHBvczogaSArIDEsXG4gICAgICB0ZWFtOiB1c2VyLm5hbWUsXG4gICAgICBzY29yZTogdXNlci5zY29yZVxuICAgIH0pKVxuICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RDdGZ0aW1lTGVhZGVyYm9hcmQsIEpTT04uc3RyaW5naWZ5KHsgc3RhbmRpbmdzIH0pXVxuICB9XG59XG4iXX0=