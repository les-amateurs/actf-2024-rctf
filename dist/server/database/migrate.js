"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const node_pg_migrate_1 = __importDefault(require("node-pg-migrate"));
const server_1 = __importDefault(require("../config/server"));
const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
const migrate = async (attempt) => {
    try {
        await node_pg_migrate_1.default({
            databaseUrl: server_1.default.database.sql,
            dir: path_1.default.join(__dirname, '../../migrations'),
            direction: 'up',
            migrationsTable: 'pgmigrations',
            verbose: true,
            count: Infinity
        });
    }
    catch (e) {
        if (attempt > 10) {
            throw e;
        }
        console.error(e);
        await sleep(2000 + attempt * 1000);
        return migrate(attempt + 1);
    }
};
exports.default = () => migrate(0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlncmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9kYXRhYmFzZS9taWdyYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXVCO0FBQ3ZCLHNFQUF1QztBQUN2Qyw4REFBcUM7QUFFckMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBRWpGLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxPQUFlLEVBQWlCLEVBQUU7SUFDdkQsSUFBSTtRQUNGLE1BQU0seUJBQVMsQ0FBQztZQUNkLFdBQVcsRUFBRSxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQ2hDLEdBQUcsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQztZQUM3QyxTQUFTLEVBQUUsSUFBSTtZQUNmLGVBQWUsRUFBRSxjQUFjO1lBQy9CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLFFBQVE7U0FDaEIsQ0FBQyxDQUFBO0tBQ0g7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRTtZQUNoQixNQUFNLENBQUMsQ0FBQTtTQUNSO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNoQixNQUFNLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQ2xDLE9BQU8sT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQTtLQUM1QjtBQUNILENBQUMsQ0FBQTtBQUVELGtCQUFlLEdBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHBnTWlncmF0ZSBmcm9tICdub2RlLXBnLW1pZ3JhdGUnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy9zZXJ2ZXInXG5cbmNvbnN0IHNsZWVwID0gKHRpbWU6IG51bWJlcikgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWUpKVxuXG5jb25zdCBtaWdyYXRlID0gYXN5bmMgKGF0dGVtcHQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IHBnTWlncmF0ZSh7XG4gICAgICBkYXRhYmFzZVVybDogY29uZmlnLmRhdGFiYXNlLnNxbCxcbiAgICAgIGRpcjogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL21pZ3JhdGlvbnMnKSxcbiAgICAgIGRpcmVjdGlvbjogJ3VwJyxcbiAgICAgIG1pZ3JhdGlvbnNUYWJsZTogJ3BnbWlncmF0aW9ucycsXG4gICAgICB2ZXJib3NlOiB0cnVlLFxuICAgICAgY291bnQ6IEluZmluaXR5XG4gICAgfSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChhdHRlbXB0ID4gMTApIHtcbiAgICAgIHRocm93IGVcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihlKVxuICAgIGF3YWl0IHNsZWVwKDIwMDAgKyBhdHRlbXB0ICogMTAwMClcbiAgICByZXR1cm4gbWlncmF0ZShhdHRlbXB0ICsgMSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoKTogUHJvbWlzZTx2b2lkPiA9PiBtaWdyYXRlKDApXG4iXX0=