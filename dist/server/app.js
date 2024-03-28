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
const path_1 = __importDefault(require("path"));
const fastify_1 = __importDefault(require("fastify"));
const fastify_static_1 = __importDefault(require("fastify-static"));
const fastify_helmet_1 = __importDefault(require("fastify-helmet"));
const hyperid_1 = __importDefault(require("hyperid"));
const server_1 = __importDefault(require("./config/server"));
const util_1 = require("./util");
const uploads_1 = require("./uploads");
const api_1 = __importStar(require("./api"));
const app = fastify_1.default({
    trustProxy: server_1.default.proxy.trust,
    logger: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        serializers: {
            // From https://github.com/fastify/fastify/blob/v3.0.2/lib/logger.js#L49
            req: (req) => ({
                method: req.method,
                url: req.url,
                version: req.headers['accept-version'],
                hostname: req.hostname,
                remoteAddress: util_1.getRealIp(req),
                remotePort: req.connection.remotePort,
                userAgent: req.headers['user-agent']
            })
        }
    },
    genReqId: hyperid_1.default()
});
app.addHook('onRequest', async (req, reply) => {
    Object.defineProperty(req, 'ip', {
        get() { return util_1.getRealIp(this); }
    });
});
app.register(fastify_helmet_1.default, {
    dnsPrefetchControl: false,
    referrerPolicy: { policy: 'origin-when-cross-origin' },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ['\'none\''],
            styleSrc: ['\'unsafe-inline\'', '\'self\''],
            scriptSrc: ['\'self\'', 'https://www.google-analytics.com', 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
            frameSrc: ['https://www.google.com/recaptcha/'],
            connectSrc: ['\'self\'', 'https://www.google-analytics.com'],
            imgSrc: ['*', 'data:']
        }
    }
});
uploads_1.init(app);
app.register(api_1.default, {
    prefix: '/api/v1/',
    logSerializers: api_1.logSerializers
});
const staticPath = path_1.default.join(__dirname, '../build');
app.register(util_1.serveIndex, {
    indexPath: path_1.default.join(staticPath, 'index.html')
});
app.register(fastify_static_1.default, {
    root: staticPath,
    setHeaders: (res, path) => {
        if (/\.[0-9a-f]{5}\.((esm\.)?js|css)$/.test(path)) {
            res.setHeader('Cache-Control', 'public, immutable, max-age=31536000');
        }
    }
});
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsc0RBQTZCO0FBQzdCLG9FQUEwQztBQUMxQyxvRUFBbUM7QUFDbkMsc0RBQTZCO0FBQzdCLDZEQUFvQztBQUNwQyxpQ0FBOEM7QUFDOUMsdUNBQXNEO0FBQ3RELDZDQUFnRTtBQUVoRSxNQUFNLEdBQUcsR0FBRyxpQkFBTyxDQUFDO0lBQ2xCLFVBQVUsRUFBRSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLO0lBQzlCLE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTztRQUMvRCxXQUFXLEVBQUU7WUFDWCx3RUFBd0U7WUFDeEUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtnQkFDbEIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO2dCQUNaLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDO2dCQUN0QyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLGFBQWEsRUFBRSxnQkFBUyxDQUFDLEdBQUcsQ0FBQztnQkFDN0IsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVTtnQkFDckMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3JDLENBQUM7U0FDSDtLQUNGO0lBQ0QsUUFBUSxFQUFFLGlCQUFPLEVBQUU7Q0FDcEIsQ0FBQyxDQUFBO0FBRUYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUM1QyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7UUFDL0IsR0FBRyxLQUFNLE9BQU8sZ0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUM7S0FDbEMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUE7QUFFRixHQUFHLENBQUMsUUFBUSxDQUFDLHdCQUFNLEVBQUU7SUFDbkIsa0JBQWtCLEVBQUUsS0FBSztJQUN6QixjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUU7SUFDdEQscUJBQXFCLEVBQUU7UUFDckIsVUFBVSxFQUFFO1lBQ1YsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsQ0FBQztZQUMzQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsa0NBQWtDLEVBQUUsbUNBQW1DLEVBQUUsb0NBQW9DLENBQUM7WUFDdEksUUFBUSxFQUFFLENBQUMsbUNBQW1DLENBQUM7WUFDL0MsVUFBVSxFQUFFLENBQUMsVUFBVSxFQUFFLGtDQUFrQyxDQUFDO1lBQzVELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7U0FDdkI7S0FDRjtDQUNGLENBQUMsQ0FBQTtBQUVGLGNBQWtCLENBQUMsR0FBRyxDQUFDLENBQUE7QUFFdkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFHLEVBQUU7SUFDaEIsTUFBTSxFQUFFLFVBQVU7SUFDbEIsY0FBYyxFQUFFLG9CQUFpQjtDQUNsQyxDQUFDLENBQUE7QUFFRixNQUFNLFVBQVUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUVuRCxHQUFHLENBQUMsUUFBUSxDQUFDLGlCQUFVLEVBQUU7SUFDdkIsU0FBUyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQztDQUMvQyxDQUFDLENBQUE7QUFDRixHQUFHLENBQUMsUUFBUSxDQUFDLHdCQUFhLEVBQUU7SUFDMUIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3hCLElBQUksa0NBQWtDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pELEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLHFDQUFxQyxDQUFDLENBQUE7U0FDdEU7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsR0FBRyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmYXN0aWZ5IGZyb20gJ2Zhc3RpZnknXG5pbXBvcnQgZmFzdGlmeVN0YXRpYyBmcm9tICdmYXN0aWZ5LXN0YXRpYydcbmltcG9ydCBoZWxtZXQgZnJvbSAnZmFzdGlmeS1oZWxtZXQnXG5pbXBvcnQgaHlwZXJpZCBmcm9tICdoeXBlcmlkJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZy9zZXJ2ZXInXG5pbXBvcnQgeyBzZXJ2ZUluZGV4LCBnZXRSZWFsSXAgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyBpbml0IGFzIHVwbG9hZFByb3ZpZGVySW5pdCB9IGZyb20gJy4vdXBsb2FkcydcbmltcG9ydCBhcGksIHsgbG9nU2VyaWFsaXplcnMgYXMgYXBpTG9nU2VyaWFsaXplcnMgfSBmcm9tICcuL2FwaSdcblxuY29uc3QgYXBwID0gZmFzdGlmeSh7XG4gIHRydXN0UHJveHk6IGNvbmZpZy5wcm94eS50cnVzdCxcbiAgbG9nZ2VyOiB7XG4gICAgbGV2ZWw6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyAnaW5mbycgOiAnZGVidWcnLFxuICAgIHNlcmlhbGl6ZXJzOiB7XG4gICAgICAvLyBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYXN0aWZ5L2Zhc3RpZnkvYmxvYi92My4wLjIvbGliL2xvZ2dlci5qcyNMNDlcbiAgICAgIHJlcTogKHJlcSkgPT4gKHtcbiAgICAgICAgbWV0aG9kOiByZXEubWV0aG9kLFxuICAgICAgICB1cmw6IHJlcS51cmwsXG4gICAgICAgIHZlcnNpb246IHJlcS5oZWFkZXJzWydhY2NlcHQtdmVyc2lvbiddLFxuICAgICAgICBob3N0bmFtZTogcmVxLmhvc3RuYW1lLFxuICAgICAgICByZW1vdGVBZGRyZXNzOiBnZXRSZWFsSXAocmVxKSxcbiAgICAgICAgcmVtb3RlUG9ydDogcmVxLmNvbm5lY3Rpb24ucmVtb3RlUG9ydCxcbiAgICAgICAgdXNlckFnZW50OiByZXEuaGVhZGVyc1sndXNlci1hZ2VudCddXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ2VuUmVxSWQ6IGh5cGVyaWQoKVxufSlcblxuYXBwLmFkZEhvb2soJ29uUmVxdWVzdCcsIGFzeW5jIChyZXEsIHJlcGx5KSA9PiB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXEsICdpcCcsIHtcbiAgICBnZXQgKCkgeyByZXR1cm4gZ2V0UmVhbElwKHRoaXMpIH1cbiAgfSlcbn0pXG5cbmFwcC5yZWdpc3RlcihoZWxtZXQsIHtcbiAgZG5zUHJlZmV0Y2hDb250cm9sOiBmYWxzZSxcbiAgcmVmZXJyZXJQb2xpY3k6IHsgcG9saWN5OiAnb3JpZ2luLXdoZW4tY3Jvc3Mtb3JpZ2luJyB9LFxuICBjb250ZW50U2VjdXJpdHlQb2xpY3k6IHtcbiAgICBkaXJlY3RpdmVzOiB7XG4gICAgICBkZWZhdWx0U3JjOiBbJ1xcJ25vbmVcXCcnXSxcbiAgICAgIHN0eWxlU3JjOiBbJ1xcJ3Vuc2FmZS1pbmxpbmVcXCcnLCAnXFwnc2VsZlxcJyddLFxuICAgICAgc2NyaXB0U3JjOiBbJ1xcJ3NlbGZcXCcnLCAnaHR0cHM6Ly93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20nLCAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWNhcHRjaGEvJywgJ2h0dHBzOi8vd3d3LmdzdGF0aWMuY29tL3JlY2FwdGNoYS8nXSxcbiAgICAgIGZyYW1lU3JjOiBbJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vcmVjYXB0Y2hhLyddLFxuICAgICAgY29ubmVjdFNyYzogWydcXCdzZWxmXFwnJywgJ2h0dHBzOi8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tJ10sXG4gICAgICBpbWdTcmM6IFsnKicsICdkYXRhOiddXG4gICAgfVxuICB9XG59KVxuXG51cGxvYWRQcm92aWRlckluaXQoYXBwKVxuXG5hcHAucmVnaXN0ZXIoYXBpLCB7XG4gIHByZWZpeDogJy9hcGkvdjEvJyxcbiAgbG9nU2VyaWFsaXplcnM6IGFwaUxvZ1NlcmlhbGl6ZXJzXG59KVxuXG5jb25zdCBzdGF0aWNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2J1aWxkJylcblxuYXBwLnJlZ2lzdGVyKHNlcnZlSW5kZXgsIHtcbiAgaW5kZXhQYXRoOiBwYXRoLmpvaW4oc3RhdGljUGF0aCwgJ2luZGV4Lmh0bWwnKVxufSlcbmFwcC5yZWdpc3RlcihmYXN0aWZ5U3RhdGljLCB7XG4gIHJvb3Q6IHN0YXRpY1BhdGgsXG4gIHNldEhlYWRlcnM6IChyZXMsIHBhdGgpID0+IHtcbiAgICBpZiAoL1xcLlswLTlhLWZdezV9XFwuKChlc21cXC4pP2pzfGNzcykkLy50ZXN0KHBhdGgpKSB7XG4gICAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ3B1YmxpYywgaW1tdXRhYmxlLCBtYXgtYWdlPTMxNTM2MDAwJylcbiAgICB9XG4gIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGFwcFxuIl19