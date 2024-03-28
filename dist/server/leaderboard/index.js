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
exports.startUpdater = void 0;
const path_1 = __importDefault(require("path"));
const worker_threads_1 = require("worker_threads");
const database = __importStar(require("../database"));
const challenges_1 = require("../challenges");
const cache = __importStar(require("../cache"));
const server_1 = __importDefault(require("../config/server"));
const fetchData = async () => {
    const [solves, users, graphUpdate] = await Promise.all([
        database.solves.getAllSolves(),
        database.users.getAllUsers(),
        cache.leaderboard.getGraphUpdate()
    ]);
    return {
        solves,
        users,
        graphUpdate,
        allChallenges: challenges_1.getAllChallenges()
    };
};
let updating = false;
const runUpdate = async () => {
    if (server_1.default.startTime > Date.now() || updating) {
        return;
    }
    updating = true;
    const worker = new worker_threads_1.Worker(path_1.default.join(__dirname, 'calculate.js'), {
        workerData: {
            data: await fetchData()
        }
    });
    worker.once('message', async (data) => {
        await cache.leaderboard.setLeaderboard(data);
        await cache.leaderboard.setGraph({ leaderboards: data.graphLeaderboards });
        updating = false;
    });
};
exports.startUpdater = () => {
    setInterval(runUpdate, server_1.default.leaderboard.updateInterval);
    runUpdate();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvbGVhZGVyYm9hcmQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF1QjtBQUN2QixtREFBdUM7QUFDdkMsc0RBQXVDO0FBQ3ZDLDhDQUFnRDtBQUNoRCxnREFBaUM7QUFDakMsOERBQXFDO0FBRXJDLE1BQU0sU0FBUyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQzNCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNyRCxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUM5QixRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtRQUM1QixLQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRTtLQUNuQyxDQUFDLENBQUE7SUFDRixPQUFPO1FBQ0wsTUFBTTtRQUNOLEtBQUs7UUFDTCxXQUFXO1FBQ1gsYUFBYSxFQUFFLDZCQUFnQixFQUFFO0tBQ2xDLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUE7QUFFcEIsTUFBTSxTQUFTLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDM0IsSUFBSSxnQkFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksUUFBUSxFQUFFO1FBQzdDLE9BQU07S0FDUDtJQUNELFFBQVEsR0FBRyxJQUFJLENBQUE7SUFDZixNQUFNLE1BQU0sR0FBRyxJQUFJLHVCQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLEVBQUU7UUFDOUQsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU0sU0FBUyxFQUFFO1NBQ3hCO0tBQ0YsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDNUMsTUFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO1FBQzFFLFFBQVEsR0FBRyxLQUFLLENBQUE7SUFDbEIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFWSxRQUFBLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDL0IsV0FBVyxDQUFDLFNBQVMsRUFBRSxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUN6RCxTQUFTLEVBQUUsQ0FBQTtBQUNiLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBXb3JrZXIgfSBmcm9tICd3b3JrZXJfdGhyZWFkcydcbmltcG9ydCAqIGFzIGRhdGFiYXNlIGZyb20gJy4uL2RhdGFiYXNlJ1xuaW1wb3J0IHsgZ2V0QWxsQ2hhbGxlbmdlcyB9IGZyb20gJy4uL2NoYWxsZW5nZXMnXG5pbXBvcnQgKiBhcyBjYWNoZSBmcm9tICcuLi9jYWNoZSdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL3NlcnZlcidcblxuY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBbc29sdmVzLCB1c2VycywgZ3JhcGhVcGRhdGVdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGRhdGFiYXNlLnNvbHZlcy5nZXRBbGxTb2x2ZXMoKSxcbiAgICBkYXRhYmFzZS51c2Vycy5nZXRBbGxVc2VycygpLFxuICAgIGNhY2hlLmxlYWRlcmJvYXJkLmdldEdyYXBoVXBkYXRlKClcbiAgXSlcbiAgcmV0dXJuIHtcbiAgICBzb2x2ZXMsXG4gICAgdXNlcnMsXG4gICAgZ3JhcGhVcGRhdGUsXG4gICAgYWxsQ2hhbGxlbmdlczogZ2V0QWxsQ2hhbGxlbmdlcygpXG4gIH1cbn1cblxubGV0IHVwZGF0aW5nID0gZmFsc2VcblxuY29uc3QgcnVuVXBkYXRlID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoY29uZmlnLnN0YXJ0VGltZSA+IERhdGUubm93KCkgfHwgdXBkYXRpbmcpIHtcbiAgICByZXR1cm5cbiAgfVxuICB1cGRhdGluZyA9IHRydWVcbiAgY29uc3Qgd29ya2VyID0gbmV3IFdvcmtlcihwYXRoLmpvaW4oX19kaXJuYW1lLCAnY2FsY3VsYXRlLmpzJyksIHtcbiAgICB3b3JrZXJEYXRhOiB7XG4gICAgICBkYXRhOiBhd2FpdCBmZXRjaERhdGEoKVxuICAgIH1cbiAgfSlcbiAgd29ya2VyLm9uY2UoJ21lc3NhZ2UnLCBhc3luYyAoZGF0YSkgPT4ge1xuICAgIGF3YWl0IGNhY2hlLmxlYWRlcmJvYXJkLnNldExlYWRlcmJvYXJkKGRhdGEpXG4gICAgYXdhaXQgY2FjaGUubGVhZGVyYm9hcmQuc2V0R3JhcGgoeyBsZWFkZXJib2FyZHM6IGRhdGEuZ3JhcGhMZWFkZXJib2FyZHMgfSlcbiAgICB1cGRhdGluZyA9IGZhbHNlXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBzdGFydFVwZGF0ZXIgPSAoKSA9PiB7XG4gIHNldEludGVydmFsKHJ1blVwZGF0ZSwgY29uZmlnLmxlYWRlcmJvYXJkLnVwZGF0ZUludGVydmFsKVxuICBydW5VcGRhdGUoKVxufVxuIl19