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
exports.getRealIp = exports.serveIndex = exports.deepCopy = void 0;
const server_1 = __importDefault(require("../config/server"));
const client_1 = __importDefault(require("../config/client"));
const fs_1 = require("fs");
const mustache_1 = __importDefault(require("mustache"));
exports.normalize = __importStar(require("./normalize"));
exports.validate = __importStar(require("./validate"));
exports.scores = __importStar(require("./scores"));
exports.restrict = __importStar(require("./restrict"));
exports.recaptcha = __importStar(require("./recaptcha"));
/**
 * Perform a deep-copy of a JSON-stringifiable object
 */
exports.deepCopy = (data) => {
    return JSON.parse(JSON.stringify(data));
};
exports.serveIndex = async (fastify, opts) => {
    const indexTemplate = (await fs_1.promises.readFile(opts.indexPath)).toString();
    const rendered = mustache_1.default.render(indexTemplate, {
        jsonConfig: JSON.stringify(client_1.default),
        config: {
            ...client_1.default,
            renderGoogleAnalytics: client_1.default.globalSiteTag !== undefined
        }
    });
    const routeHandler = async (req, reply) => {
        void reply.type('text/html; charset=UTF-8');
        void reply.send(rendered);
    };
    fastify.get('/', routeHandler);
    fastify.get('/index.html', async (req, reply) => reply.redirect(301, '/'));
    fastify.get('//*', async (req, reply) => reply.redirect(302, '/'));
    // Fastify bug #2466
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    fastify.setNotFoundHandler(routeHandler);
};
const getFastifyIp = (req) => 
// Use `get` on req.__proto__ since this function is used in req's getter
Reflect.get(Object.getPrototypeOf(req), 'ip', req);
// Parse Cloudflare CF-Connecting-IP header
const getCloudflareIp = (req) => req.headers['cf-connecting-ip'];
let getRealIp = getFastifyIp;
exports.getRealIp = getRealIp;
if (server_1.default.proxy.cloudflare) {
    exports.getRealIp = getRealIp = (req) => getCloudflareIp(req) || getFastifyIp(req);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvdXRpbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQXFDO0FBQ3JDLDhEQUEyQztBQUMzQywyQkFBbUM7QUFDbkMsd0RBQStCO0FBRy9CLHlEQUF3QztBQUN4Qyx1REFBc0M7QUFDdEMsbURBQWtDO0FBQ2xDLHVEQUFzQztBQUN0Qyx5REFBd0M7QUFFeEM7O0dBRUc7QUFDVSxRQUFBLFFBQVEsR0FBRyxDQUFJLElBQU8sRUFBSyxFQUFFO0lBQ3hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFNLENBQUE7QUFDOUMsQ0FBQyxDQUFBO0FBRVksUUFBQSxVQUFVLEdBQStDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDNUYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFNLGFBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7SUFFcEUsTUFBTSxRQUFRLEdBQUcsa0JBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO1FBQzlDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFZLENBQUM7UUFDeEMsTUFBTSxFQUFFO1lBQ04sR0FBRyxnQkFBWTtZQUNmLHFCQUFxQixFQUFFLGdCQUFZLENBQUMsYUFBYSxLQUFLLFNBQVM7U0FDaEU7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLFlBQVksR0FBdUIsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM1RCxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtRQUMzQyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0IsQ0FBQyxDQUFBO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDbEUsb0JBQW9CO0lBQ3BCLGtFQUFrRTtJQUNsRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDMUMsQ0FBQyxDQUFBO0FBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFtQixFQUFVLEVBQUU7QUFDbkQseUVBQXlFO0FBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFrQixDQUFBO0FBRXJFLDJDQUEyQztBQUMzQyxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQW1CLEVBQXNCLEVBQUUsQ0FDbEUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBdUIsQ0FBQTtBQUV2RCxJQUFJLFNBQVMsR0FBb0MsWUFBWSxDQUFBO0FBT3BELDhCQUFTO0FBTGxCLElBQUksZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO0lBQzNCLG9CQUFBLFNBQVMsR0FBRyxDQUFDLEdBQW1CLEVBQVUsRUFBRSxDQUMxQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0NBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcvc2VydmVyJ1xuaW1wb3J0IGNsaWVudENvbmZpZyBmcm9tICcuLi9jb25maWcvY2xpZW50J1xuaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnMgfSBmcm9tICdmcydcbmltcG9ydCBtdXN0YWNoZSBmcm9tICdtdXN0YWNoZSdcbmltcG9ydCB7IEZhc3RpZnlQbHVnaW5Bc3luYywgRmFzdGlmeVJlcXVlc3QsIFJvdXRlSGFuZGxlck1ldGhvZCB9IGZyb20gJ2Zhc3RpZnknXG5cbmV4cG9ydCAqIGFzIG5vcm1hbGl6ZSBmcm9tICcuL25vcm1hbGl6ZSdcbmV4cG9ydCAqIGFzIHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUnXG5leHBvcnQgKiBhcyBzY29yZXMgZnJvbSAnLi9zY29yZXMnXG5leHBvcnQgKiBhcyByZXN0cmljdCBmcm9tICcuL3Jlc3RyaWN0J1xuZXhwb3J0ICogYXMgcmVjYXB0Y2hhIGZyb20gJy4vcmVjYXB0Y2hhJ1xuXG4vKipcbiAqIFBlcmZvcm0gYSBkZWVwLWNvcHkgb2YgYSBKU09OLXN0cmluZ2lmaWFibGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBkZWVwQ29weSA9IDxUPihkYXRhOiBUKTogVCA9PiB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKSBhcyBUXG59XG5cbmV4cG9ydCBjb25zdCBzZXJ2ZUluZGV4OiBGYXN0aWZ5UGx1Z2luQXN5bmM8eyBpbmRleFBhdGg6IHN0cmluZzsgfT4gPSBhc3luYyAoZmFzdGlmeSwgb3B0cykgPT4ge1xuICBjb25zdCBpbmRleFRlbXBsYXRlID0gKGF3YWl0IGZzLnJlYWRGaWxlKG9wdHMuaW5kZXhQYXRoKSkudG9TdHJpbmcoKVxuXG4gIGNvbnN0IHJlbmRlcmVkID0gbXVzdGFjaGUucmVuZGVyKGluZGV4VGVtcGxhdGUsIHtcbiAgICBqc29uQ29uZmlnOiBKU09OLnN0cmluZ2lmeShjbGllbnRDb25maWcpLFxuICAgIGNvbmZpZzoge1xuICAgICAgLi4uY2xpZW50Q29uZmlnLFxuICAgICAgcmVuZGVyR29vZ2xlQW5hbHl0aWNzOiBjbGllbnRDb25maWcuZ2xvYmFsU2l0ZVRhZyAhPT0gdW5kZWZpbmVkXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHJvdXRlSGFuZGxlcjogUm91dGVIYW5kbGVyTWV0aG9kID0gYXN5bmMgKHJlcSwgcmVwbHkpID0+IHtcbiAgICB2b2lkIHJlcGx5LnR5cGUoJ3RleHQvaHRtbDsgY2hhcnNldD1VVEYtOCcpXG4gICAgdm9pZCByZXBseS5zZW5kKHJlbmRlcmVkKVxuICB9XG5cbiAgZmFzdGlmeS5nZXQoJy8nLCByb3V0ZUhhbmRsZXIpXG4gIGZhc3RpZnkuZ2V0KCcvaW5kZXguaHRtbCcsIGFzeW5jIChyZXEsIHJlcGx5KSA9PiByZXBseS5yZWRpcmVjdCgzMDEsICcvJykpXG4gIGZhc3RpZnkuZ2V0KCcvLyonLCBhc3luYyAocmVxLCByZXBseSkgPT4gcmVwbHkucmVkaXJlY3QoMzAyLCAnLycpKVxuICAvLyBGYXN0aWZ5IGJ1ZyAjMjQ2NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW1pc3VzZWQtcHJvbWlzZXNcbiAgZmFzdGlmeS5zZXROb3RGb3VuZEhhbmRsZXIocm91dGVIYW5kbGVyKVxufVxuXG5jb25zdCBnZXRGYXN0aWZ5SXAgPSAocmVxOiBGYXN0aWZ5UmVxdWVzdCk6IHN0cmluZyA9PlxuICAvLyBVc2UgYGdldGAgb24gcmVxLl9fcHJvdG9fXyBzaW5jZSB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQgaW4gcmVxJ3MgZ2V0dGVyXG4gIFJlZmxlY3QuZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihyZXEpLCAnaXAnLCByZXEpIGFzIHR5cGVvZiByZXEuaXBcblxuLy8gUGFyc2UgQ2xvdWRmbGFyZSBDRi1Db25uZWN0aW5nLUlQIGhlYWRlclxuY29uc3QgZ2V0Q2xvdWRmbGFyZUlwID0gKHJlcTogRmFzdGlmeVJlcXVlc3QpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT5cbiAgcmVxLmhlYWRlcnNbJ2NmLWNvbm5lY3RpbmctaXAnXSBhcyBzdHJpbmcgfCB1bmRlZmluZWRcblxubGV0IGdldFJlYWxJcDogKHJlcTogRmFzdGlmeVJlcXVlc3QpID0+IHN0cmluZyA9IGdldEZhc3RpZnlJcFxuXG5pZiAoY29uZmlnLnByb3h5LmNsb3VkZmxhcmUpIHtcbiAgZ2V0UmVhbElwID0gKHJlcTogRmFzdGlmeVJlcXVlc3QpOiBzdHJpbmcgPT5cbiAgICBnZXRDbG91ZGZsYXJlSXAocmVxKSB8fCBnZXRGYXN0aWZ5SXAocmVxKVxufVxuXG5leHBvcnQgeyBnZXRSZWFsSXAgfVxuIl19