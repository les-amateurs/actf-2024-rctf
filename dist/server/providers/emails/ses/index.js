"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesError = void 0;
const util_1 = require("util");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class SesError extends Error {
    constructor(sesError) {
        super(sesError.message);
        this.sesError = sesError;
    }
}
exports.SesError = SesError;
class SesProvider {
    constructor(_options) {
        const options = {
            awsKeyId: _options.awsKeyId || process.env.RCTF_SES_KEY_ID,
            awsKeySecret: _options.awsKeySecret || process.env.RCTF_SES_KEY_SECRET,
            awsRegion: _options.awsRegion || process.env.RCTF_SES_REGION
        };
        // TODO: validate that all options are indeed provided
        const credentials = new aws_sdk_1.default.Credentials({
            accessKeyId: options.awsKeyId,
            secretAccessKey: options.awsKeySecret
        });
        const ses = new aws_sdk_1.default.SES({
            credentials,
            region: options.awsRegion
        });
        this.sesSend = util_1.promisify(ses.sendEmail.bind(ses));
    }
    async send(mail) {
        try {
            await this.sesSend({
                Destination: {
                    ToAddresses: [mail.to]
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: 'UTF-8',
                            Data: mail.html
                        },
                        Text: {
                            Charset: 'UTF-8',
                            Data: mail.text
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: mail.subject
                    }
                },
                Source: mail.from
            });
        }
        catch (e) {
            throw new SesError(e);
        }
    }
}
exports.default = SesProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvcHJvdmlkZXJzL2VtYWlscy9zZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0JBQWdDO0FBQ2hDLHNEQUF5QjtBQVN6QixNQUFhLFFBQVMsU0FBUSxLQUFLO0lBRWpDLFlBQWEsUUFBZTtRQUMxQixLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0lBQzFCLENBQUM7Q0FDRjtBQU5ELDRCQU1DO0FBRUQsTUFBcUIsV0FBVztJQUc5QixZQUFhLFFBQXFDO1FBQ2hELE1BQU0sT0FBTyxHQUFpQztZQUM1QyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWU7WUFDMUQsWUFBWSxFQUFFLFFBQVEsQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7WUFDdEUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlO1NBQzdCLENBQUE7UUFDakMsc0RBQXNEO1FBRXRELE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQUcsQ0FBQyxXQUFXLENBQUM7WUFDdEMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzdCLGVBQWUsRUFBRSxPQUFPLENBQUMsWUFBWTtTQUN0QyxDQUFDLENBQUE7UUFDRixNQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFHLENBQUMsR0FBRyxDQUFDO1lBQ3RCLFdBQVc7WUFDWCxNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVM7U0FDMUIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUUsSUFBVTtRQUNwQixJQUFJO1lBQ0YsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNqQixXQUFXLEVBQUU7b0JBQ1gsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRTt3QkFDSixJQUFJLEVBQUU7NEJBQ0osT0FBTyxFQUFFLE9BQU87NEJBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt5QkFDaEI7d0JBQ0QsSUFBSSxFQUFFOzRCQUNKLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7eUJBQ2hCO3FCQUNGO29CQUNELE9BQU8sRUFBRTt3QkFDUCxPQUFPLEVBQUUsT0FBTzt3QkFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO3FCQUNuQjtpQkFDRjtnQkFDRCxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbEIsQ0FBQyxDQUFBO1NBQ0g7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDdEI7SUFDSCxDQUFDO0NBQ0Y7QUFsREQsOEJBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCdcbmltcG9ydCBBV1MgZnJvbSAnYXdzLXNkaydcbmltcG9ydCB7IFByb3ZpZGVyLCBNYWlsIH0gZnJvbSAnLi4vLi4vLi4vZW1haWwvcHJvdmlkZXInXG5cbmludGVyZmFjZSBTZXNQcm92aWRlck9wdGlvbnMge1xuICBhd3NLZXlJZDogc3RyaW5nO1xuICBhd3NLZXlTZWNyZXQ6IHN0cmluZztcbiAgYXdzUmVnaW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBTZXNFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc2VzRXJyb3I6IEVycm9yXG4gIGNvbnN0cnVjdG9yIChzZXNFcnJvcjogRXJyb3IpIHtcbiAgICBzdXBlcihzZXNFcnJvci5tZXNzYWdlKVxuICAgIHRoaXMuc2VzRXJyb3IgPSBzZXNFcnJvclxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlc1Byb3ZpZGVyIGltcGxlbWVudHMgUHJvdmlkZXIge1xuICBwcml2YXRlIHNlc1NlbmQ6IChwYXJhbXM6IEFXUy5TRVMuVHlwZXMuU2VuZEVtYWlsUmVxdWVzdCkgPT4gUHJvbWlzZTxBV1MuU0VTLlR5cGVzLlNlbmRFbWFpbFJlc3BvbnNlPlxuXG4gIGNvbnN0cnVjdG9yIChfb3B0aW9uczogUGFydGlhbDxTZXNQcm92aWRlck9wdGlvbnM+KSB7XG4gICAgY29uc3Qgb3B0aW9uczogUmVxdWlyZWQ8U2VzUHJvdmlkZXJPcHRpb25zPiA9IHtcbiAgICAgIGF3c0tleUlkOiBfb3B0aW9ucy5hd3NLZXlJZCB8fCBwcm9jZXNzLmVudi5SQ1RGX1NFU19LRVlfSUQsXG4gICAgICBhd3NLZXlTZWNyZXQ6IF9vcHRpb25zLmF3c0tleVNlY3JldCB8fCBwcm9jZXNzLmVudi5SQ1RGX1NFU19LRVlfU0VDUkVULFxuICAgICAgYXdzUmVnaW9uOiBfb3B0aW9ucy5hd3NSZWdpb24gfHwgcHJvY2Vzcy5lbnYuUkNURl9TRVNfUkVHSU9OXG4gICAgfSBhcyBSZXF1aXJlZDxTZXNQcm92aWRlck9wdGlvbnM+XG4gICAgLy8gVE9ETzogdmFsaWRhdGUgdGhhdCBhbGwgb3B0aW9ucyBhcmUgaW5kZWVkIHByb3ZpZGVkXG5cbiAgICBjb25zdCBjcmVkZW50aWFscyA9IG5ldyBBV1MuQ3JlZGVudGlhbHMoe1xuICAgICAgYWNjZXNzS2V5SWQ6IG9wdGlvbnMuYXdzS2V5SWQsXG4gICAgICBzZWNyZXRBY2Nlc3NLZXk6IG9wdGlvbnMuYXdzS2V5U2VjcmV0XG4gICAgfSlcbiAgICBjb25zdCBzZXMgPSBuZXcgQVdTLlNFUyh7XG4gICAgICBjcmVkZW50aWFscyxcbiAgICAgIHJlZ2lvbjogb3B0aW9ucy5hd3NSZWdpb25cbiAgICB9KVxuICAgIHRoaXMuc2VzU2VuZCA9IHByb21pc2lmeShzZXMuc2VuZEVtYWlsLmJpbmQoc2VzKSlcbiAgfVxuXG4gIGFzeW5jIHNlbmQgKG1haWw6IE1haWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5zZXNTZW5kKHtcbiAgICAgICAgRGVzdGluYXRpb246IHtcbiAgICAgICAgICBUb0FkZHJlc3NlczogW21haWwudG9dXG4gICAgICAgIH0sXG4gICAgICAgIE1lc3NhZ2U6IHtcbiAgICAgICAgICBCb2R5OiB7XG4gICAgICAgICAgICBIdG1sOiB7XG4gICAgICAgICAgICAgIENoYXJzZXQ6ICdVVEYtOCcsXG4gICAgICAgICAgICAgIERhdGE6IG1haWwuaHRtbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFRleHQ6IHtcbiAgICAgICAgICAgICAgQ2hhcnNldDogJ1VURi04JyxcbiAgICAgICAgICAgICAgRGF0YTogbWFpbC50ZXh0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBTdWJqZWN0OiB7XG4gICAgICAgICAgICBDaGFyc2V0OiAnVVRGLTgnLFxuICAgICAgICAgICAgRGF0YTogbWFpbC5zdWJqZWN0XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBTb3VyY2U6IG1haWwuZnJvbVxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgU2VzRXJyb3IoZSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==