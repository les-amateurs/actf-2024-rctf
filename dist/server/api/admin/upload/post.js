"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responses_1 = require("../../../responses");
const perms_1 = __importDefault(require("../../../util/perms"));
const uploads_1 = require("../../../uploads");
const data_uri_to_buffer_1 = __importDefault(require("data-uri-to-buffer"));
const itemSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        data: {
            type: 'string'
        }
    },
    required: ['name', 'data']
};
exports.default = {
    method: 'POST',
    path: '/admin/upload',
    requireAuth: true,
    perms: perms_1.default.challsWrite,
    schema: {
        body: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: itemSchema
                }
            },
            required: ['files']
        }
    },
    bodyLimit: 2 ** 30,
    handler: async ({ req }) => {
        let convertedFiles;
        try {
            convertedFiles = req.body.files.map(({ name, data }) => {
                return {
                    name,
                    data: data_uri_to_buffer_1.default(data)
                };
            });
        }
        catch (e) {
            return responses_1.responses.badDataUri;
        }
        try {
            const files = await Promise.all(convertedFiles.map(async ({ name, data }) => {
                const url = await uploads_1.upload(data, name);
                return {
                    name,
                    url
                };
            }));
            return [responses_1.responses.goodFilesUpload, files];
        }
        catch (e) {
            req.log.error({ err: e }, e && e.message);
            return responses_1.responses.badFilesUpload;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NlcnZlci9hcGkvYWRtaW4vdXBsb2FkL3Bvc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBOEM7QUFDOUMsZ0VBQXVDO0FBQ3ZDLDhDQUF5QztBQUN6Qyw0RUFBeUM7QUFFekMsTUFBTSxVQUFVLEdBQUc7SUFDakIsSUFBSSxFQUFFLFFBQVE7SUFDZCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7U0FDZjtLQUNGO0lBQ0QsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztDQUMzQixDQUFBO0FBRUQsa0JBQWU7SUFDYixNQUFNLEVBQUUsTUFBTTtJQUNkLElBQUksRUFBRSxlQUFlO0lBQ3JCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLEtBQUssRUFBRSxlQUFLLENBQUMsV0FBVztJQUN4QixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLE9BQU87b0JBQ2IsS0FBSyxFQUFFLFVBQVU7aUJBQ2xCO2FBQ0Y7WUFDRCxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUM7U0FDcEI7S0FDRjtJQUNELFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRTtJQUNsQixPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtRQUN6QixJQUFJLGNBQWMsQ0FBQTtRQUNsQixJQUFJO1lBQ0YsY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7Z0JBQ3JELE9BQU87b0JBQ0wsSUFBSTtvQkFDSixJQUFJLEVBQUUsNEJBQVEsQ0FBQyxJQUFJLENBQUM7aUJBQ3JCLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FBQTtTQUNIO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLHFCQUFTLENBQUMsVUFBVSxDQUFBO1NBQzVCO1FBRUQsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDN0IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFFcEMsT0FBTztvQkFDTCxJQUFJO29CQUNKLEdBQUc7aUJBQ0osQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUNILENBQUE7WUFFRCxPQUFPLENBQUMscUJBQVMsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDMUM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUNYLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUNWLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUNmLENBQUE7WUFDRCxPQUFPLHFCQUFTLENBQUMsY0FBYyxDQUFBO1NBQ2hDO0lBQ0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNwb25zZXMgfSBmcm9tICcuLi8uLi8uLi9yZXNwb25zZXMnXG5pbXBvcnQgcGVybXMgZnJvbSAnLi4vLi4vLi4vdXRpbC9wZXJtcydcbmltcG9ydCB7IHVwbG9hZCB9IGZyb20gJy4uLy4uLy4uL3VwbG9hZHMnXG5pbXBvcnQgdG9CdWZmZXIgZnJvbSAnZGF0YS11cmktdG8tYnVmZmVyJ1xuXG5jb25zdCBpdGVtU2NoZW1hID0ge1xuICB0eXBlOiAnb2JqZWN0JyxcbiAgcHJvcGVydGllczoge1xuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH1cbiAgfSxcbiAgcmVxdWlyZWQ6IFsnbmFtZScsICdkYXRhJ11cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2Q6ICdQT1NUJyxcbiAgcGF0aDogJy9hZG1pbi91cGxvYWQnLFxuICByZXF1aXJlQXV0aDogdHJ1ZSxcbiAgcGVybXM6IHBlcm1zLmNoYWxsc1dyaXRlLFxuICBzY2hlbWE6IHtcbiAgICBib2R5OiB7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZmlsZXM6IHtcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIGl0ZW1zOiBpdGVtU2NoZW1hXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXF1aXJlZDogWydmaWxlcyddXG4gICAgfVxuICB9LFxuICBib2R5TGltaXQ6IDIgKiogMzAsIC8vIDEgR2lCXG4gIGhhbmRsZXI6IGFzeW5jICh7IHJlcSB9KSA9PiB7XG4gICAgbGV0IGNvbnZlcnRlZEZpbGVzXG4gICAgdHJ5IHtcbiAgICAgIGNvbnZlcnRlZEZpbGVzID0gcmVxLmJvZHkuZmlsZXMubWFwKCh7IG5hbWUsIGRhdGEgfSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgZGF0YTogdG9CdWZmZXIoZGF0YSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VzLmJhZERhdGFVcmlcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgY29udmVydGVkRmlsZXMubWFwKGFzeW5jICh7IG5hbWUsIGRhdGEgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHVybCA9IGF3YWl0IHVwbG9hZChkYXRhLCBuYW1lKVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICB1cmxcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBbcmVzcG9uc2VzLmdvb2RGaWxlc1VwbG9hZCwgZmlsZXNdXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmVxLmxvZy5lcnJvcihcbiAgICAgICAgeyBlcnI6IGUgfSxcbiAgICAgICAgZSAmJiBlLm1lc3NhZ2VcbiAgICAgIClcbiAgICAgIHJldHVybiByZXNwb25zZXMuYmFkRmlsZXNVcGxvYWRcbiAgICB9XG4gIH1cbn1cbiJdfQ==