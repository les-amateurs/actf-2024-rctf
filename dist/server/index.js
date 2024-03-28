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
require("dotenv/config");
const server_1 = __importDefault(require("./config/server"));
const runMigrations = async () => {
    const { default: migrate } = await Promise.resolve().then(() => __importStar(require('./database/migrate')));
    await migrate();
};
const runMain = async () => {
    const { subscribeChallUpdate } = await Promise.resolve().then(() => __importStar(require('./cache/challs')));
    await subscribeChallUpdate();
    if (server_1.default.instanceType === 'frontend' || server_1.default.instanceType === 'all') {
        const port = process.env.PORT || 3000;
        const { default: app } = await Promise.resolve().then(() => __importStar(require('./app')));
        app.listen(port, '::', err => {
            if (err) {
                app.log.error(err);
            }
        });
    }
    else {
        const { init: uploadProviderInit } = await Promise.resolve().then(() => __importStar(require('./uploads')));
        uploadProviderInit(null);
    }
    if (server_1.default.instanceType === 'leaderboard' || server_1.default.instanceType === 'all') {
        const { startUpdater } = await Promise.resolve().then(() => __importStar(require('./leaderboard')));
        startUpdater();
        console.log('Started leaderboard updater');
    }
};
(async () => {
    switch (server_1.default.database.migrate) {
        case 'before':
            await runMigrations();
            await runMain();
            break;
        case 'only':
            await runMigrations();
            break;
        case 'never':
            await runMain();
            break;
        default:
            throw new Error('migration config not recognized');
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUJBQXNCO0FBRXRCLDZEQUFvQztBQUVwQyxNQUFNLGFBQWEsR0FBRyxLQUFLLElBQUksRUFBRTtJQUMvQixNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLHdEQUFhLG9CQUFvQixHQUFDLENBQUE7SUFDL0QsTUFBTSxPQUFPLEVBQUUsQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFFRCxNQUFNLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRTtJQUN6QixNQUFNLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyx3REFBYSxnQkFBZ0IsR0FBQyxDQUFBO0lBRS9ELE1BQU0sb0JBQW9CLEVBQUUsQ0FBQTtJQUU1QixJQUFJLGdCQUFNLENBQUMsWUFBWSxLQUFLLFVBQVUsSUFBSSxnQkFBTSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7UUFDdkUsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFBO1FBRXJDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsd0RBQWEsT0FBTyxHQUFDLENBQUE7UUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksR0FBRyxFQUFFO2dCQUNQLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQUE7S0FDSDtTQUFNO1FBQ0wsTUFBTSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxHQUFHLHdEQUFhLFdBQVcsR0FBQyxDQUFBO1FBRTlELGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3pCO0lBQ0QsSUFBSSxnQkFBTSxDQUFDLFlBQVksS0FBSyxhQUFhLElBQUksZ0JBQU0sQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO1FBQzFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyx3REFBYSxlQUFlLEdBQUMsQ0FBQTtRQUN0RCxZQUFZLEVBQUUsQ0FBQTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtLQUMzQztBQUNILENBQUMsQ0FBQTtBQUVELENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDVixRQUFRLGdCQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUMvQixLQUFLLFFBQVE7WUFDWCxNQUFNLGFBQWEsRUFBRSxDQUFBO1lBQ3JCLE1BQU0sT0FBTyxFQUFFLENBQUE7WUFDZixNQUFLO1FBQ1AsS0FBSyxNQUFNO1lBQ1QsTUFBTSxhQUFhLEVBQUUsQ0FBQTtZQUNyQixNQUFLO1FBQ1AsS0FBSyxPQUFPO1lBQ1YsTUFBTSxPQUFPLEVBQUUsQ0FBQTtZQUNmLE1BQUs7UUFDUDtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtLQUNyRDtBQUNILENBQUMsQ0FBQyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2RvdGVudi9jb25maWcnXG5cbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcvc2VydmVyJ1xuXG5jb25zdCBydW5NaWdyYXRpb25zID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCB7IGRlZmF1bHQ6IG1pZ3JhdGUgfSA9IGF3YWl0IGltcG9ydCgnLi9kYXRhYmFzZS9taWdyYXRlJylcbiAgYXdhaXQgbWlncmF0ZSgpXG59XG5cbmNvbnN0IHJ1bk1haW4gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHsgc3Vic2NyaWJlQ2hhbGxVcGRhdGUgfSA9IGF3YWl0IGltcG9ydCgnLi9jYWNoZS9jaGFsbHMnKVxuXG4gIGF3YWl0IHN1YnNjcmliZUNoYWxsVXBkYXRlKClcblxuICBpZiAoY29uZmlnLmluc3RhbmNlVHlwZSA9PT0gJ2Zyb250ZW5kJyB8fCBjb25maWcuaW5zdGFuY2VUeXBlID09PSAnYWxsJykge1xuICAgIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDBcblxuICAgIGNvbnN0IHsgZGVmYXVsdDogYXBwIH0gPSBhd2FpdCBpbXBvcnQoJy4vYXBwJylcbiAgICBhcHAubGlzdGVuKHBvcnQsICc6OicsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGFwcC5sb2cuZXJyb3IoZXJyKVxuICAgICAgfVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgeyBpbml0OiB1cGxvYWRQcm92aWRlckluaXQgfSA9IGF3YWl0IGltcG9ydCgnLi91cGxvYWRzJylcblxuICAgIHVwbG9hZFByb3ZpZGVySW5pdChudWxsKVxuICB9XG4gIGlmIChjb25maWcuaW5zdGFuY2VUeXBlID09PSAnbGVhZGVyYm9hcmQnIHx8IGNvbmZpZy5pbnN0YW5jZVR5cGUgPT09ICdhbGwnKSB7XG4gICAgY29uc3QgeyBzdGFydFVwZGF0ZXIgfSA9IGF3YWl0IGltcG9ydCgnLi9sZWFkZXJib2FyZCcpXG4gICAgc3RhcnRVcGRhdGVyKClcbiAgICBjb25zb2xlLmxvZygnU3RhcnRlZCBsZWFkZXJib2FyZCB1cGRhdGVyJylcbiAgfVxufVxuXG4oYXN5bmMgKCkgPT4ge1xuICBzd2l0Y2ggKGNvbmZpZy5kYXRhYmFzZS5taWdyYXRlKSB7XG4gICAgY2FzZSAnYmVmb3JlJzpcbiAgICAgIGF3YWl0IHJ1bk1pZ3JhdGlvbnMoKVxuICAgICAgYXdhaXQgcnVuTWFpbigpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ29ubHknOlxuICAgICAgYXdhaXQgcnVuTWlncmF0aW9ucygpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ25ldmVyJzpcbiAgICAgIGF3YWl0IHJ1bk1haW4oKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaWdyYXRpb24gY29uZmlnIG5vdCByZWNvZ25pemVkJylcbiAgfVxufSkoKVxuIl19