"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const server_1 = __importDefault(require("../../../config/server"));
const fastify_static_1 = __importDefault(require("fastify-static"));
const content_disposition_1 = __importDefault(require("content-disposition"));
class LocalProvider {
    constructor(options, app) {
        if (options.uploadDirectory === undefined) {
            options.uploadDirectory = path_1.default.join(process_1.default.cwd(), 'uploads');
        }
        fs_1.default.mkdirSync(options.uploadDirectory, { recursive: true });
        this.uploadDirectory = path_1.default.resolve(options.uploadDirectory);
        this.endpoint = options.endpoint || '/uploads';
        this.uploadMap = new Map();
        void app.register(async (fastify) => {
            void fastify.register(fastify_static_1.default, {
                root: this.uploadDirectory,
                serve: false
            });
            // Fastify bug #2466
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            fastify.setNotFoundHandler(async (req, res) => {
                void res.status(404);
                return 'Not found';
            });
            fastify.get('/', {
                schema: {
                    querystring: {
                        type: 'object',
                        properties: {
                            key: {
                                type: 'string'
                            }
                        },
                        required: ['key']
                    }
                }
            }, async (request, reply) => {
                const key = request.query.key.toString();
                const upload = this.uploadMap.get(key);
                if (upload != null) {
                    void reply.header('Cache-Control', 'public, max-age=31557600, immutable');
                    void reply.header('Content-Disposition', content_disposition_1.default(upload.name));
                    void reply.sendFile(path_1.default.relative(this.uploadDirectory, upload.filePath));
                }
                else {
                    reply.callNotFound();
                }
            });
        }, {
            prefix: this.endpoint
        });
    }
    getKey(hash, name) {
        return `${hash}/${name}`;
    }
    getUrlPath(key) {
        return `${this.endpoint}?key=${encodeURIComponent(key)}`;
    }
    async upload(data, name) {
        const hash = crypto_1.default.createHash('sha256')
            .update(data)
            .digest('hex');
        const key = this.getKey(hash, name);
        const urlPath = this.getUrlPath(key);
        const filePath = path_1.default.join(this.uploadDirectory, hash);
        this.uploadMap.set(key, {
            filePath,
            name
        });
        await fs_1.default.promises.writeFile(filePath, data);
        return (server_1.default.origin || '') + urlPath;
    }
    async getUrl(sha256, name) {
        const key = this.getKey(sha256, name);
        if (!this.uploadMap.has(key))
            return null;
        return this.getUrlPath(key);
    }
}
exports.default = LocalProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvcHJvdmlkZXJzL3VwbG9hZHMvbG9jYWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxzREFBNkI7QUFDN0IsZ0RBQXVCO0FBQ3ZCLDRDQUFtQjtBQUNuQixvREFBMkI7QUFDM0Isb0VBQTJDO0FBRTNDLG9FQUEwQztBQUMxQyw4RUFBb0Q7QUFnQnBELE1BQXFCLGFBQWE7SUFNaEMsWUFBYSxPQUE2QixFQUFFLEdBQW9CO1FBQzlELElBQUksT0FBTyxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7WUFDekMsT0FBTyxDQUFDLGVBQWUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUE7U0FDOUQ7UUFFRCxZQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUUxRCxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUE7UUFFOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQTtRQUUxQyxLQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2xDLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyx3QkFBYSxFQUFFO2dCQUNuQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQzFCLEtBQUssRUFBRSxLQUFLO2FBQ2IsQ0FBQyxDQUFBO1lBRUYsb0JBQW9CO1lBQ3BCLGtFQUFrRTtZQUNsRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEdB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QUFHLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUE7UUFFekMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDRjtBQS9GRCxnQ0ErRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJy4uLy4uLy4uL3VwbG9hZHMvcHJvdmlkZXInXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdwcm9jZXNzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcvc2VydmVyJ1xuaW1wb3J0IHsgRmFzdGlmeUluc3RhbmNlIH0gZnJvbSAnZmFzdGlmeSdcbmltcG9ydCBmYXN0aWZ5U3RhdGljIGZyb20gJ2Zhc3RpZnktc3RhdGljJ1xuaW1wb3J0IGNvbnRlbnREaXNwb3NpdGlvbiBmcm9tICdjb250ZW50LWRpc3Bvc2l0aW9uJ1xuXG5pbnRlcmZhY2UgTG9jYWxQcm92aWRlck9wdGlvbnMge1xuICB1cGxvYWREaXJlY3Rvcnk/OiBzdHJpbmc7XG4gIGVuZHBvaW50Pzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgVXBsb2FkIHtcbiAgZmlsZVBhdGg6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdFF1ZXJ5c3RyaW5nIHtcbiAga2V5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2FsUHJvdmlkZXIgaW1wbGVtZW50cyBQcm92aWRlciB7XG4gIHByaXZhdGUgdXBsb2FkRGlyZWN0b3J5OiBzdHJpbmdcbiAgcHJpdmF0ZSBlbmRwb2ludDogc3RyaW5nXG5cbiAgcHJpdmF0ZSB1cGxvYWRNYXA6IE1hcDxzdHJpbmcsIFVwbG9hZD5cblxuICBjb25zdHJ1Y3RvciAob3B0aW9uczogTG9jYWxQcm92aWRlck9wdGlvbnMsIGFwcDogRmFzdGlmeUluc3RhbmNlKSB7XG4gICAgaWYgKG9wdGlvbnMudXBsb2FkRGlyZWN0b3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMudXBsb2FkRGlyZWN0b3J5ID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICd1cGxvYWRzJylcbiAgICB9XG5cbiAgICBmcy5ta2RpclN5bmMob3B0aW9ucy51cGxvYWREaXJlY3RvcnksIHsgcmVjdXJzaXZlOiB0cnVlIH0pXG5cbiAgICB0aGlzLnVwbG9hZERpcmVjdG9yeSA9IHBhdGgucmVzb2x2ZShvcHRpb25zLnVwbG9hZERpcmVjdG9yeSlcbiAgICB0aGlzLmVuZHBvaW50ID0gb3B0aW9ucy5lbmRwb2ludCB8fCAnL3VwbG9hZHMnXG5cbiAgICB0aGlzLnVwbG9hZE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBVcGxvYWQ+KClcblxuICAgIHZvaWQgYXBwLnJlZ2lzdGVyKGFzeW5jIChmYXN0aWZ5KSA9PiB7XG4gICAgICB2b2lkIGZhc3RpZnkucmVnaXN0ZXIoZmFzdGlmeVN0YXRpYywge1xuICAgICAgICByb290OiB0aGlzLnVwbG9hZERpcmVjdG9yeSxcbiAgICAgICAgc2VydmU6IGZhbHNlXG4gICAgICB9KVxuXG4gICAgICAvLyBGYXN0aWZ5IGJ1ZyAjMjQ2NlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1taXN1c2VkLXByb21pc2VzXG4gICAgICBmYXN0aWZ5LnNldE5vdEZvdW5kSGFuZGxlcihhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICAgICAgdm9pZCByZXMuc3RhdHVzKDQwNClcbiAgICAgICAgcmV0dXJuICdOb3QgZm91bmQnXG4gICAgICB9KVxuXG4gICAgICBmYXN0aWZ5LmdldDx7XG4gICAgICAgIFF1ZXJ5c3RyaW5nOiBSZXF1ZXN0UXVlcnlzdHJpbmdcbiAgICAgIH0+KCcvJywge1xuICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICBxdWVyeXN0cmluZzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIGtleToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1aXJlZDogWydrZXknXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgYXN5bmMgKHJlcXVlc3QsIHJlcGx5KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHJlcXVlc3QucXVlcnkua2V5LnRvU3RyaW5nKClcblxuICAgICAgICBjb25zdCB1cGxvYWQgPSB0aGlzLnVwbG9hZE1hcC5nZXQoa2V5KVxuICAgICAgICBpZiAodXBsb2FkICE9IG51bGwpIHtcbiAgICAgICAgICB2b2lkIHJlcGx5LmhlYWRlcignQ2FjaGUtQ29udHJvbCcsICdwdWJsaWMsIG1heC1hZ2U9MzE1NTc2MDAsIGltbXV0YWJsZScpXG4gICAgICAgICAgdm9pZCByZXBseS5oZWFkZXIoJ0NvbnRlbnQtRGlzcG9zaXRpb24nLCBjb250ZW50RGlzcG9zaXRpb24odXBsb2FkLm5hbWUpKVxuICAgICAgICAgIHZvaWQgcmVwbHkuc2VuZEZpbGUocGF0aC5yZWxhdGl2ZSh0aGlzLnVwbG9hZERpcmVjdG9yeSwgdXBsb2FkLmZpbGVQYXRoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBseS5jYWxsTm90Rm91bmQoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sIHtcbiAgICAgIHByZWZpeDogdGhpcy5lbmRwb2ludFxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIGdldEtleSAoaGFzaDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtoYXNofS8ke25hbWV9YFxuICB9XG5cbiAgcHJpdmF0ZSBnZXRVcmxQYXRoIChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuZW5kcG9pbnR9P2tleT0ke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfWBcbiAgfVxuXG4gIGFzeW5jIHVwbG9hZCAoZGF0YTogQnVmZmVyLCBuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2JylcbiAgICAgIC51cGRhdGUoZGF0YSlcbiAgICAgIC5kaWdlc3QoJ2hleCcpXG5cbiAgICBjb25zdCBrZXkgPSB0aGlzLmdldEtleShoYXNoLCBuYW1lKVxuICAgIGNvbnN0IHVybFBhdGggPSB0aGlzLmdldFVybFBhdGgoa2V5KVxuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKHRoaXMudXBsb2FkRGlyZWN0b3J5LCBoYXNoKVxuXG4gICAgdGhpcy51cGxvYWRNYXAuc2V0KGtleSwge1xuICAgICAgZmlsZVBhdGgsXG4gICAgICBuYW1lXG4gICAgfSlcblxuICAgIGF3YWl0IGZzLnByb21pc2VzLndyaXRlRmlsZShmaWxlUGF0aCwgZGF0YSlcblxuICAgIHJldHVybiAoY29uZmlnLm9yaWdpbiB8fCAnJykgKyB1cmxQYXRoXG4gIH1cblxuICBhc3luYyBnZXRVcmwgKHNoYTI1Njogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5nZXRLZXkoc2hhMjU2LCBuYW1lKVxuICAgIGlmICghdGhpcy51cGxvYWRNYXAuaGFzKGtleSkpIHJldHVybiBudWxsXG5cbiAgICByZXR1cm4gdGhpcy5nZXRVcmxQYXRoKGtleSlcbiAgfVxufVxuIl19