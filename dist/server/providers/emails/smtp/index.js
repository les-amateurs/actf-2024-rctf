"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class SmtpProvider {
    constructor(_options) {
        const options = {
            smtpUrl: _options.smtpUrl || process.env.RCTF_SMTP_URL
        };
        // TODO: validate that all options are indeed provided
        this.mailer = nodemailer_1.default.createTransport(options.smtpUrl);
    }
    async send(mail) {
        await this.mailer.sendMail(mail);
    }
}
exports.default = SmtpProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvcHJvdmlkZXJzL2VtYWlscy9zbXRwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW1DO0FBUW5DLE1BQXFCLFlBQVk7SUFFL0IsWUFBYSxRQUFzQztRQUNqRCxNQUFNLE9BQU8sR0FBa0M7WUFDN0MsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO1NBQ3RCLENBQUE7UUFDbEMsc0RBQXNEO1FBRXRELElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFFLElBQVU7UUFDcEIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0NBQ0Y7QUFkRCwrQkFjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBub2RlbWFpbGVyIGZyb20gJ25vZGVtYWlsZXInXG5pbXBvcnQgTWFpbGVyIGZyb20gJ25vZGVtYWlsZXIvbGliL21haWxlcidcbmltcG9ydCB7IFByb3ZpZGVyLCBNYWlsIH0gZnJvbSAnLi4vLi4vLi4vZW1haWwvcHJvdmlkZXInXG5cbmludGVyZmFjZSBTbXRwUHJvdmlkZXJPcHRpb25zIHtcbiAgc210cFVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbXRwUHJvdmlkZXIgaW1wbGVtZW50cyBQcm92aWRlciB7XG4gIHByaXZhdGUgbWFpbGVyOiBNYWlsZXJcbiAgY29uc3RydWN0b3IgKF9vcHRpb25zOiBQYXJ0aWFsPFNtdHBQcm92aWRlck9wdGlvbnM+KSB7XG4gICAgY29uc3Qgb3B0aW9uczogUmVxdWlyZWQ8U210cFByb3ZpZGVyT3B0aW9ucz4gPSB7XG4gICAgICBzbXRwVXJsOiBfb3B0aW9ucy5zbXRwVXJsIHx8IHByb2Nlc3MuZW52LlJDVEZfU01UUF9VUkxcbiAgICB9IGFzIFJlcXVpcmVkPFNtdHBQcm92aWRlck9wdGlvbnM+XG4gICAgLy8gVE9ETzogdmFsaWRhdGUgdGhhdCBhbGwgb3B0aW9ucyBhcmUgaW5kZWVkIHByb3ZpZGVkXG5cbiAgICB0aGlzLm1haWxlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KG9wdGlvbnMuc210cFVybClcbiAgfVxuXG4gIGFzeW5jIHNlbmQgKG1haWw6IE1haWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm1haWxlci5zZW5kTWFpbChtYWlsKVxuICB9XG59XG4iXX0=