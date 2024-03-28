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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSerializers = void 0;
const responses_1 = require("../responses");
const auth = __importStar(require("../auth"));
const db = __importStar(require("../database"));
const routes = [
    ...require('./leaderboard').default,
    ...require('./challs').default,
    ...require('./integrations/ctftime').default,
    ...require('./integrations/client').default,
    ...require('./users').default,
    ...require('./auth').default,
    ...require('./admin').default,
    ...require('./store').default
];
const makeSendResponse = (res) => (responseKind, data = null) => {
    const response = responses_1.responseList[responseKind];
    if (response === undefined) {
        throw new Error(`unknown response ${responseKind}`);
    }
    res.code(response.status);
    if (response.rawContentType !== undefined) {
        res.type(response.rawContentType);
        res.send(data);
    }
    else {
        res.send({
            kind: responseKind,
            message: response.message,
            data
        });
    }
};
exports.default = async (fastify) => {
    fastify.setErrorHandler((error, req, reply) => {
        const sendResponse = makeSendResponse(reply);
        if (error.validation) {
            sendResponse(responses_1.responses.badBody);
            return;
        }
        const res = reply.raw;
        // based on https://github.com/fastify/fastify/blob/2.x/lib/context.js#L29
        if (res.statusCode >= 500) {
            reply.log.error({ req: reply.request.raw, res, err: error }, error && error.message);
            sendResponse(responses_1.responses.errorInternal);
            return;
        }
        else if (res.statusCode >= 400) {
            reply.log.info({ res, err: error }, error && error.message);
        }
        reply.send(error);
    });
    fastify.setNotFoundHandler((req, res) => {
        const { url, method } = req.raw;
        req.log.info(`Route ${url}:${method} not found`);
        makeSendResponse(res)(responses_1.responses.badEndpoint);
    });
    routes.forEach((route, i) => {
        const handler = async (req, res) => {
            const sendResponse = makeSendResponse(res);
            let user;
            if (route.requireAuth) {
                const authHeader = req.headers.authorization;
                if (authHeader === undefined || !authHeader.startsWith('Bearer ')) {
                    sendResponse(responses_1.responses.badToken);
                    return;
                }
                const uuid = await auth.token.getData(auth.token.tokenKinds.auth, authHeader.slice('Bearer '.length));
                if (uuid === null) {
                    sendResponse(responses_1.responses.badToken);
                    return;
                }
                user = await db.users.getUserById({
                    id: uuid
                });
                if (!user) {
                    sendResponse(responses_1.responses.badToken);
                    return;
                }
                req.log = req.log.child({ user });
                req.log.info('user authenticated');
            }
            if (route.perms !== undefined) {
                if (user === undefined) {
                    throw new Error('routes with perms must set requireAuth to true');
                }
                if ((user.perms & route.perms) !== route.perms) {
                    sendResponse(responses_1.responses.badPerms);
                    return;
                }
            }
            const response = await route.handler({ req, user });
            if (response instanceof Array) {
                sendResponse(...response);
            }
            else {
                sendResponse(response);
            }
        };
        const fastifyRoute = {
            ...route,
            url: route.path,
            handler
        };
        delete fastifyRoute.path;
        delete fastifyRoute.requireAuth;
        delete fastifyRoute.perms;
        fastify.route(fastifyRoute);
    });
    fastify.route({
        method: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS'],
        url: '/*',
        handler: async (req, res) => {
            res.callNotFound();
        }
    });
};
exports.logSerializers = {
    user: user => user.id
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvYXBpL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBc0Q7QUFDdEQsOENBQStCO0FBQy9CLGdEQUFpQztBQUVqQyxNQUFNLE1BQU0sR0FBRztJQUNiLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU87SUFDbkMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTztJQUM5QixHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU87SUFDNUMsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxPQUFPO0lBQzNDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU87SUFDN0IsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTztJQUM1QixHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPO0lBQzdCLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU87Q0FDOUIsQ0FBQTtBQUVELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsWUFBWSxFQUFFLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRTtJQUM5RCxNQUFNLFFBQVEsR0FBRyx3QkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQzNDLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixZQUFZLEVBQUUsQ0FBQyxDQUFBO0tBQ3BEO0lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDekIsSUFBSSxRQUFRLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtRQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FB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QUFJO1lBQ2YsT0FBTztTQUNSLENBQUE7UUFDRCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUE7UUFDeEIsT0FBTyxZQUFZLENBQUMsV0FBVyxDQUFBO1FBQy9CLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQTtRQUV6QixPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQzdCLENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNaLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQztRQUNwRSxHQUFHLEVBQUUsSUFBSTtRQUNULE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzFCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNwQixDQUFDO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBRVksUUFBQSxjQUFjLEdBQUc7SUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7Q0FDdEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc3BvbnNlcywgcmVzcG9uc2VMaXN0IH0gZnJvbSAnLi4vcmVzcG9uc2VzJ1xuaW1wb3J0ICogYXMgYXV0aCBmcm9tICcuLi9hdXRoJ1xuaW1wb3J0ICogYXMgZGIgZnJvbSAnLi4vZGF0YWJhc2UnXG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAgLi4ucmVxdWlyZSgnLi9sZWFkZXJib2FyZCcpLmRlZmF1bHQsXG4gIC4uLnJlcXVpcmUoJy4vY2hhbGxzJykuZGVmYXVsdCxcbiAgLi4ucmVxdWlyZSgnLi9pbnRlZ3JhdGlvbnMvY3RmdGltZScpLmRlZmF1bHQsXG4gIC4uLnJlcXVpcmUoJy4vaW50ZWdyYXRpb25zL2NsaWVudCcpLmRlZmF1bHQsXG4gIC4uLnJlcXVpcmUoJy4vdXNlcnMnKS5kZWZhdWx0LFxuICAuLi5yZXF1aXJlKCcuL2F1dGgnKS5kZWZhdWx0LFxuICAuLi5yZXF1aXJlKCcuL2FkbWluJykuZGVmYXVsdCxcbiAgLi4ucmVxdWlyZSgnLi9zdG9yZScpLmRlZmF1bHRcbl1cblxuY29uc3QgbWFrZVNlbmRSZXNwb25zZSA9IChyZXMpID0+IChyZXNwb25zZUtpbmQsIGRhdGEgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gcmVzcG9uc2VMaXN0W3Jlc3BvbnNlS2luZF1cbiAgaWYgKHJlc3BvbnNlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gcmVzcG9uc2UgJHtyZXNwb25zZUtpbmR9YClcbiAgfVxuICByZXMuY29kZShyZXNwb25zZS5zdGF0dXMpXG4gIGlmIChyZXNwb25zZS5yYXdDb250ZW50VHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmVzLnR5cGUocmVzcG9uc2UucmF3Q29udGVudFR5cGUpXG4gICAgcmVzLnNlbmQoZGF0YSlcbiAgfSBlbHNlIHtcbiAgICByZXMuc2VuZCh7XG4gICAgICBraW5kOiByZXNwb25zZUtpbmQsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5tZXNzYWdlLFxuICAgICAgZGF0YVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGZhc3RpZnkpID0+IHtcbiAgZmFzdGlmeS5zZXRFcnJvckhhbmRsZXIoKGVycm9yLCByZXEsIHJlcGx5KSA9PiB7XG4gICAgY29uc3Qgc2VuZFJlc3BvbnNlID0gbWFrZVNlbmRSZXNwb25zZShyZXBseSlcbiAgICBpZiAoZXJyb3IudmFsaWRhdGlvbikge1xuICAgICAgc2VuZFJlc3BvbnNlKHJlc3BvbnNlcy5iYWRCb2R5KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcmVzID0gcmVwbHkucmF3XG5cbiAgICAvLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vZmFzdGlmeS9mYXN0aWZ5L2Jsb2IvMi54L2xpYi9jb250ZXh0LmpzI0wyOVxuICAgIGlmIChyZXMuc3RhdHVzQ29kZSA+PSA1MDApIHtcbiAgICAgIHJlcGx5LmxvZy5lcnJvcihcbiAgICAgICAgeyByZXE6IHJlcGx5LnJlcXVlc3QucmF3LCByZXMsIGVycjogZXJyb3IgfSxcbiAgICAgICAgZXJyb3IgJiYgZXJyb3IubWVzc2FnZVxuICAgICAgKVxuICAgICAgc2VuZFJlc3BvbnNlKHJlc3BvbnNlcy5lcnJvckludGVybmFsKVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChyZXMuc3RhdHVzQ29kZSA+PSA0MDApIHtcbiAgICAgIHJlcGx5LmxvZy5pbmZvKFxuICAgICAgICB7IHJlcywgZXJyOiBlcnJvciB9LFxuICAgICAgICBlcnJvciAmJiBlcnJvci5tZXNzYWdlXG4gICAgICApXG4gICAgfVxuICAgIHJlcGx5LnNlbmQoZXJyb3IpXG4gIH0pXG5cbiAgZmFzdGlmeS5zZXROb3RGb3VuZEhhbmRsZXIoKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyB1cmwsIG1ldGhvZCB9ID0gcmVxLnJhd1xuICAgIHJlcS5sb2cuaW5mbyhgUm91dGUgJHt1cmx9OiR7bWV0aG9kfSBub3QgZm91bmRgKVxuICAgIG1ha2VTZW5kUmVzcG9uc2UocmVzKShyZXNwb25zZXMuYmFkRW5kcG9pbnQpXG4gIH0pXG5cbiAgcm91dGVzLmZvckVhY2goKHJvdXRlLCBpKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgICAgY29uc3Qgc2VuZFJlc3BvbnNlID0gbWFrZVNlbmRSZXNwb25zZShyZXMpXG4gICAgICBsZXQgdXNlclxuICAgICAgaWYgKHJvdXRlLnJlcXVpcmVBdXRoKSB7XG4gICAgICAgIGNvbnN0IGF1dGhIZWFkZXIgPSByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uXG4gICAgICAgIGlmIChhdXRoSGVhZGVyID09PSB1bmRlZmluZWQgfHwgIWF1dGhIZWFkZXIuc3RhcnRzV2l0aCgnQmVhcmVyICcpKSB7XG4gICAgICAgICAgc2VuZFJlc3BvbnNlKHJlc3BvbnNlcy5iYWRUb2tlbilcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1dWlkID0gYXdhaXQgYXV0aC50b2tlbi5nZXREYXRhKGF1dGgudG9rZW4udG9rZW5LaW5kcy5hdXRoLCBhdXRoSGVhZGVyLnNsaWNlKCdCZWFyZXIgJy5sZW5ndGgpKVxuICAgICAgICBpZiAodXVpZCA9PT0gbnVsbCkge1xuICAgICAgICAgIHNlbmRSZXNwb25zZShyZXNwb25zZXMuYmFkVG9rZW4pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB1c2VyID0gYXdhaXQgZGIudXNlcnMuZ2V0VXNlckJ5SWQoe1xuICAgICAgICAgIGlkOiB1dWlkXG4gICAgICAgIH0pXG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIHNlbmRSZXNwb25zZShyZXNwb25zZXMuYmFkVG9rZW4pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgcmVxLmxvZyA9IHJlcS5sb2cuY2hpbGQoeyB1c2VyIH0pXG4gICAgICAgIHJlcS5sb2cuaW5mbygndXNlciBhdXRoZW50aWNhdGVkJylcbiAgICAgIH1cblxuICAgICAgaWYgKHJvdXRlLnBlcm1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHVzZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncm91dGVzIHdpdGggcGVybXMgbXVzdCBzZXQgcmVxdWlyZUF1dGggdG8gdHJ1ZScpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh1c2VyLnBlcm1zICYgcm91dGUucGVybXMpICE9PSByb3V0ZS5wZXJtcykge1xuICAgICAgICAgIHNlbmRSZXNwb25zZShyZXNwb25zZXMuYmFkUGVybXMpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByb3V0ZS5oYW5kbGVyKHsgcmVxLCB1c2VyIH0pXG4gICAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBzZW5kUmVzcG9uc2UoLi4ucmVzcG9uc2UpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZW5kUmVzcG9uc2UocmVzcG9uc2UpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZmFzdGlmeVJvdXRlID0ge1xuICAgICAgLi4ucm91dGUsXG4gICAgICB1cmw6IHJvdXRlLnBhdGgsXG4gICAgICBoYW5kbGVyXG4gICAgfVxuICAgIGRlbGV0ZSBmYXN0aWZ5Um91dGUucGF0aFxuICAgIGRlbGV0ZSBmYXN0aWZ5Um91dGUucmVxdWlyZUF1dGhcbiAgICBkZWxldGUgZmFzdGlmeVJvdXRlLnBlcm1zXG5cbiAgICBmYXN0aWZ5LnJvdXRlKGZhc3RpZnlSb3V0ZSlcbiAgfSlcblxuICBmYXN0aWZ5LnJvdXRlKHtcbiAgICBtZXRob2Q6IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ1BBVENIJywgJ1BPU1QnLCAnUFVUJywgJ09QVElPTlMnXSxcbiAgICB1cmw6ICcvKicsXG4gICAgaGFuZGxlcjogYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgICByZXMuY2FsbE5vdEZvdW5kKClcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsb2dTZXJpYWxpemVycyA9IHtcbiAgdXNlcjogdXNlciA9PiB1c2VyLmlkXG59XG4iXX0=