"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgun_js_1 = __importDefault(require("mailgun-js"));
class MailgunProvider {
    constructor(_options) {
        const options = {
            apiKey: _options.apiKey || process.env.RCTF_MAILGUN_API_KEY,
            domain: _options.domain || process.env.RCTF_MAILGUN_DOMAIN
        };
        // TODO: validate that all options are indeed provided
        this.mailer = mailgun_js_1.default({
            apiKey: options.apiKey,
            domain: options.domain
        }).messages();
    }
    async send(mail) {
        await this.mailer.send(mail);
    }
}
exports.default = MailgunProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvcHJvdmlkZXJzL2VtYWlscy9tYWlsZ3VuL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQTJCO0FBUTNCLE1BQXFCLGVBQWU7SUFFbEMsWUFBYSxRQUF5QztRQUNwRCxNQUFNLE9BQU8sR0FBcUM7WUFDaEQsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7WUFDM0QsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7U0FDdkIsQ0FBQTtRQUNyQyxzREFBc0Q7UUFFdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBRSxDQUFDO1lBQ2YsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBRSxJQUFVO1FBQ3BCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDOUIsQ0FBQztDQUNGO0FBbEJELGtDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtZyBmcm9tICdtYWlsZ3VuLWpzJ1xuaW1wb3J0IHsgUHJvdmlkZXIsIE1haWwgfSBmcm9tICcuLi8uLi8uLi9lbWFpbC9wcm92aWRlcidcblxuaW50ZXJmYWNlIE1haWxndW5Qcm92aWRlck9wdGlvbnMge1xuICBhcGlLZXk6IHN0cmluZztcbiAgZG9tYWluOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW5Qcm92aWRlciBpbXBsZW1lbnRzIFByb3ZpZGVyIHtcbiAgcHJpdmF0ZSBtYWlsZXI6IG1nLk1lc3NhZ2VzXG4gIGNvbnN0cnVjdG9yIChfb3B0aW9uczogUGFydGlhbDxNYWlsZ3VuUHJvdmlkZXJPcHRpb25zPikge1xuICAgIGNvbnN0IG9wdGlvbnM6IFJlcXVpcmVkPE1haWxndW5Qcm92aWRlck9wdGlvbnM+ID0ge1xuICAgICAgYXBpS2V5OiBfb3B0aW9ucy5hcGlLZXkgfHwgcHJvY2Vzcy5lbnYuUkNURl9NQUlMR1VOX0FQSV9LRVksXG4gICAgICBkb21haW46IF9vcHRpb25zLmRvbWFpbiB8fCBwcm9jZXNzLmVudi5SQ1RGX01BSUxHVU5fRE9NQUlOXG4gICAgfSBhcyBSZXF1aXJlZDxNYWlsZ3VuUHJvdmlkZXJPcHRpb25zPlxuICAgIC8vIFRPRE86IHZhbGlkYXRlIHRoYXQgYWxsIG9wdGlvbnMgYXJlIGluZGVlZCBwcm92aWRlZFxuXG4gICAgdGhpcy5tYWlsZXIgPSBtZyh7XG4gICAgICBhcGlLZXk6IG9wdGlvbnMuYXBpS2V5LFxuICAgICAgZG9tYWluOiBvcHRpb25zLmRvbWFpblxuICAgIH0pLm1lc3NhZ2VzKClcbiAgfVxuXG4gIGFzeW5jIHNlbmQgKG1haWw6IE1haWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm1haWxlci5zZW5kKG1haWwpXG4gIH1cbn1cbiJdfQ==