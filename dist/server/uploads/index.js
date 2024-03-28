"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = exports.upload = exports.init = void 0;
const server_1 = __importDefault(require("../config/server"));
const path_1 = __importDefault(require("path"));
let provider = null;
exports.init = (app) => {
    var _a;
    const name = app === null ? 'uploads/dummy' : server_1.default.uploadProvider.name;
    // FIXME: use async loading
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { default: ProviderClass } = require(path_1.default.join('../providers', name));
    provider = new ProviderClass((_a = server_1.default.uploadProvider.options) !== null && _a !== void 0 ? _a : {}, app);
};
exports.upload = (data, name) => {
    if (provider === null) {
        throw new Error('upload provider called before initialization');
    }
    return provider.upload(data, name);
};
exports.getUrl = (sha256, name) => {
    if (provider === null) {
        throw new Error('upload provider called before initialization');
    }
    return provider.getUrl(sha256, name);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvdXBsb2Fkcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4REFBcUM7QUFDckMsZ0RBQXVCO0FBSXZCLElBQUksUUFBUSxHQUFvQixJQUFJLENBQUE7QUFFdkIsUUFBQSxJQUFJLEdBQUcsQ0FBQyxHQUEyQixFQUFRLEVBQUU7O0lBQ3hELE1BQU0sSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsZ0JBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFBO0lBRXhFLDJCQUEyQjtJQUMzQiw4REFBOEQ7SUFDOUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQXFDLENBQUE7SUFFL0csUUFBUSxHQUFHLElBQUksYUFBYSxPQUFDLGdCQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sbUNBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3hFLENBQUMsQ0FBQTtBQUVZLFFBQUEsTUFBTSxHQUFHLENBQUMsSUFBWSxFQUFFLElBQVksRUFBbUIsRUFBRTtJQUNwRSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFBO0tBQ2hFO0lBRUQsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUE7QUFFWSxRQUFBLE1BQU0sR0FBRyxDQUFDLE1BQWMsRUFBRSxJQUFZLEVBQXdCLEVBQUU7SUFDM0UsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQTtLQUNoRTtJQUVELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcvc2VydmVyJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IFByb3ZpZGVyLCBQcm92aWRlckNvbnN0cnVjdG9yIH0gZnJvbSAnLi9wcm92aWRlcidcbmltcG9ydCB7IEZhc3RpZnlJbnN0YW5jZSB9IGZyb20gJ2Zhc3RpZnknXG5cbmxldCBwcm92aWRlcjogUHJvdmlkZXIgfCBudWxsID0gbnVsbFxuXG5leHBvcnQgY29uc3QgaW5pdCA9IChhcHA6IEZhc3RpZnlJbnN0YW5jZSB8IG51bGwpOiB2b2lkID0+IHtcbiAgY29uc3QgbmFtZSA9IGFwcCA9PT0gbnVsbCA/ICd1cGxvYWRzL2R1bW15JyA6IGNvbmZpZy51cGxvYWRQcm92aWRlci5uYW1lXG5cbiAgLy8gRklYTUU6IHVzZSBhc3luYyBsb2FkaW5nXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gIGNvbnN0IHsgZGVmYXVsdDogUHJvdmlkZXJDbGFzcyB9ID0gcmVxdWlyZShwYXRoLmpvaW4oJy4uL3Byb3ZpZGVycycsIG5hbWUpKSBhcyB7IGRlZmF1bHQ6IFByb3ZpZGVyQ29uc3RydWN0b3IgfVxuXG4gIHByb3ZpZGVyID0gbmV3IFByb3ZpZGVyQ2xhc3MoY29uZmlnLnVwbG9hZFByb3ZpZGVyLm9wdGlvbnMgPz8ge30sIGFwcClcbn1cblxuZXhwb3J0IGNvbnN0IHVwbG9hZCA9IChkYXRhOiBCdWZmZXIsIG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGlmIChwcm92aWRlciA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXBsb2FkIHByb3ZpZGVyIGNhbGxlZCBiZWZvcmUgaW5pdGlhbGl6YXRpb24nKVxuICB9XG5cbiAgcmV0dXJuIHByb3ZpZGVyLnVwbG9hZChkYXRhLCBuYW1lKVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VXJsID0gKHNoYTI1Njogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ3xudWxsPiA9PiB7XG4gIGlmIChwcm92aWRlciA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXBsb2FkIHByb3ZpZGVyIGNhbGxlZCBiZWZvcmUgaW5pdGlhbGl6YXRpb24nKVxuICB9XG5cbiAgcmV0dXJuIHByb3ZpZGVyLmdldFVybChzaGEyNTYsIG5hbWUpXG59XG4iXX0=