"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@google-cloud/storage");
const crypto_1 = __importDefault(require("crypto"));
class GcsProvider {
    constructor(_options) {
        this.getGcsFile = (sha256, name) => {
            const key = `uploads/${sha256}/${name}`;
            const file = this.bucket.file(key);
            return file;
        };
        this.upload = async (data, name) => {
            const hash = crypto_1.default.createHash('sha256').update(data).digest('hex');
            const file = this.getGcsFile(hash, name);
            const exists = (await file.exists())[0];
            if (!exists) {
                await file.save(data, {
                    public: true,
                    resumable: false,
                    metadata: {
                        contentDisposition: 'download'
                    }
                });
            }
            return this.toUrl(hash, name);
        };
        const options = {
            credentials: _options.credentials || JSON.parse(process.env.RCTF_GCS_CREDENTIALS),
            bucketName: _options.bucketName || process.env.RCTF_GCS_BUCKET
        };
        // TODO: validate that all options are indeed provided
        const storage = new storage_1.Storage({
            credentials: options.credentials
        });
        this.bucket = new storage_1.Bucket(storage, options.bucketName);
        this.bucketName = options.bucketName;
    }
    toUrl(sha256, name) {
        return `https://${this.bucketName}.storage.googleapis.com/uploads/${sha256}/${encodeURIComponent(name)}`;
    }
    async getUrl(sha256, name) {
        const file = this.getGcsFile(sha256, name);
        const exists = (await file.exists())[0];
        if (!exists)
            return null;
        return this.toUrl(sha256, name);
    }
}
exports.default = GcsProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvcHJvdmlkZXJzL3VwbG9hZHMvZ2NzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQTZEO0FBQzdELG9EQUEyQjtBQVEzQixNQUFxQixXQUFXO0lBSTlCLFlBQWEsUUFBcUM7UUFjMUMsZUFBVSxHQUFHLENBQUMsTUFBYyxFQUFFLElBQVksRUFBUSxFQUFFO1lBQzFELE1BQU0sR0FBRyxHQUFHLFdBQVcsTUFBTSxJQUFJLElBQUksRUFBRSxDQUFBO1lBQ3ZDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2xDLE9BQU8sSUFBSSxDQUFBO1FBQ2IsQ0FBQyxDQUFBO1FBRUQsV0FBTSxHQUFHLEtBQUssRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFtQixFQUFFO1lBQzdELE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDbkUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDeEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDcEIsTUFBTSxFQUFFLElBQUk7b0JBQ1osU0FBUyxFQUFFLEtBQUs7b0JBQ2hCLFFBQVEsRUFBRTt3QkFDUixrQkFBa0IsRUFBRSxVQUFVO3FCQUMvQjtpQkFDRixDQUFDLENBQUE7YUFDSDtZQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDL0IsQ0FBQyxDQUFBO1FBakNDLE1BQU0sT0FBTyxHQUFpQztZQUM1QyxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQThCLENBQXNDO1lBQ2hJLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBeUI7U0FDekUsQ0FBQTtRQUNELHNEQUFzRDtRQUV0RCxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUM7WUFDMUIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1NBQ2pDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDckQsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFBO0lBQ3RDLENBQUM7SUF3Qk8sS0FBSyxDQUFFLE1BQWMsRUFBRSxJQUFZO1FBQ3pDLE9BQU8sV0FBVyxJQUFJLENBQUMsVUFBVSxtQ0FBbUMsTUFBTSxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7SUFDMUcsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUUsTUFBYyxFQUFFLElBQVk7UUFDeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFMUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUE7UUFFeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0NBQ0Y7QUFwREQsOEJBb0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZSwgQnVja2V0LCBGaWxlIH0gZnJvbSAnQGdvb2dsZS1jbG91ZC9zdG9yYWdlJ1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJy4uLy4uLy4uL3VwbG9hZHMvcHJvdmlkZXInXG5cbmludGVyZmFjZSBHY3NQcm92aWRlck9wdGlvbnMge1xuICBjcmVkZW50aWFsczogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIGJ1Y2tldE5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2NzUHJvdmlkZXIgaW1wbGVtZW50cyBQcm92aWRlciB7XG4gIHByaXZhdGUgYnVja2V0OiBCdWNrZXRcbiAgcHJpdmF0ZSBidWNrZXROYW1lOiBzdHJpbmdcblxuICBjb25zdHJ1Y3RvciAoX29wdGlvbnM6IFBhcnRpYWw8R2NzUHJvdmlkZXJPcHRpb25zPikge1xuICAgIGNvbnN0IG9wdGlvbnM6IFJlcXVpcmVkPEdjc1Byb3ZpZGVyT3B0aW9ucz4gPSB7XG4gICAgICBjcmVkZW50aWFsczogX29wdGlvbnMuY3JlZGVudGlhbHMgfHwgSlNPTi5wYXJzZShwcm9jZXNzLmVudi5SQ1RGX0dDU19DUkVERU5USUFMUyBhcyBzdHJpbmcpIGFzIEdjc1Byb3ZpZGVyT3B0aW9uc1snY3JlZGVudGlhbHMnXSxcbiAgICAgIGJ1Y2tldE5hbWU6IF9vcHRpb25zLmJ1Y2tldE5hbWUgfHwgcHJvY2Vzcy5lbnYuUkNURl9HQ1NfQlVDS0VUIGFzIHN0cmluZ1xuICAgIH1cbiAgICAvLyBUT0RPOiB2YWxpZGF0ZSB0aGF0IGFsbCBvcHRpb25zIGFyZSBpbmRlZWQgcHJvdmlkZWRcblxuICAgIGNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSh7XG4gICAgICBjcmVkZW50aWFsczogb3B0aW9ucy5jcmVkZW50aWFsc1xuICAgIH0pXG4gICAgdGhpcy5idWNrZXQgPSBuZXcgQnVja2V0KHN0b3JhZ2UsIG9wdGlvbnMuYnVja2V0TmFtZSlcbiAgICB0aGlzLmJ1Y2tldE5hbWUgPSBvcHRpb25zLmJ1Y2tldE5hbWVcbiAgfVxuXG4gIHByaXZhdGUgZ2V0R2NzRmlsZSA9IChzaGEyNTY6IHN0cmluZywgbmFtZTogc3RyaW5nKTogRmlsZSA9PiB7XG4gICAgY29uc3Qga2V5ID0gYHVwbG9hZHMvJHtzaGEyNTZ9LyR7bmFtZX1gXG4gICAgY29uc3QgZmlsZSA9IHRoaXMuYnVja2V0LmZpbGUoa2V5KVxuICAgIHJldHVybiBmaWxlXG4gIH1cblxuICB1cGxvYWQgPSBhc3luYyAoZGF0YTogQnVmZmVyLCBuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKGRhdGEpLmRpZ2VzdCgnaGV4JylcbiAgICBjb25zdCBmaWxlID0gdGhpcy5nZXRHY3NGaWxlKGhhc2gsIG5hbWUpXG4gICAgY29uc3QgZXhpc3RzID0gKGF3YWl0IGZpbGUuZXhpc3RzKCkpWzBdXG4gICAgaWYgKCFleGlzdHMpIHtcbiAgICAgIGF3YWl0IGZpbGUuc2F2ZShkYXRhLCB7XG4gICAgICAgIHB1YmxpYzogdHJ1ZSxcbiAgICAgICAgcmVzdW1hYmxlOiBmYWxzZSxcbiAgICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgICBjb250ZW50RGlzcG9zaXRpb246ICdkb3dubG9hZCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudG9VcmwoaGFzaCwgbmFtZSlcbiAgfVxuXG4gIHByaXZhdGUgdG9VcmwgKHNoYTI1Njogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgaHR0cHM6Ly8ke3RoaXMuYnVja2V0TmFtZX0uc3RvcmFnZS5nb29nbGVhcGlzLmNvbS91cGxvYWRzLyR7c2hhMjU2fS8ke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX1gXG4gIH1cblxuICBhc3luYyBnZXRVcmwgKHNoYTI1Njogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgY29uc3QgZmlsZSA9IHRoaXMuZ2V0R2NzRmlsZShzaGEyNTYsIG5hbWUpXG5cbiAgICBjb25zdCBleGlzdHMgPSAoYXdhaXQgZmlsZS5leGlzdHMoKSlbMF1cbiAgICBpZiAoIWV4aXN0cykgcmV0dXJuIG51bGxcblxuICAgIHJldHVybiB0aGlzLnRvVXJsKHNoYTI1NiwgbmFtZSlcbiAgfVxufVxuIl19