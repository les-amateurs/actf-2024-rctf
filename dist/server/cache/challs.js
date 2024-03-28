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
exports.challUpdateEmitter = exports.publishChallUpdate = exports.subscribeChallUpdate = void 0;
const events_1 = __importDefault(require("events"));
const util_1 = require("util");
const client_1 = __importStar(require("./client"));
const redisSubscribe = util_1.promisify(client_1.subClient.subscribe.bind(client_1.subClient));
const redisPublish = util_1.promisify(client_1.default.publish.bind(client_1.default));
const redisClient = util_1.promisify(client_1.default.client.bind(client_1.default));
const channel = `${client_1.default.selected_db || 0}:chall-updates`;
const clientId = redisClient('id');
exports.subscribeChallUpdate = async () => {
    await redisSubscribe(channel);
};
exports.publishChallUpdate = async () => {
    await redisPublish(channel, await clientId);
};
exports.challUpdateEmitter = new events_1.default();
client_1.subClient.on('message', async (msgChannel, msg) => {
    if (msgChannel !== channel || await clientId === parseInt(msg)) {
        return;
    }
    exports.challUpdateEmitter.emit('update');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL2NhY2hlL2NoYWxscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWlDO0FBQ2pDLCtCQUFnQztBQUNoQyxtREFBNEM7QUFFNUMsTUFBTSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQVMsQ0FBQyxDQUFDLENBQUE7QUFDckUsTUFBTSxZQUFZLEdBQUcsZ0JBQVMsQ0FBQyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLENBQUE7QUFDM0QsTUFBTSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLENBQUE7QUFFekQsTUFBTSxPQUFPLEdBQUcsR0FBRyxnQkFBTSxDQUFDLFdBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFBO0FBQzFELE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUVyQixRQUFBLG9CQUFvQixHQUFHLEtBQUssSUFBSSxFQUFFO0lBQzdDLE1BQU0sY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQTtBQUVZLFFBQUEsa0JBQWtCLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDM0MsTUFBTSxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDLENBQUE7QUFDN0MsQ0FBQyxDQUFBO0FBRVksUUFBQSxrQkFBa0IsR0FBRyxJQUFJLGdCQUFZLEVBQUUsQ0FBQTtBQUVwRCxrQkFBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNoRCxJQUFJLFVBQVUsS0FBSyxPQUFPLElBQUksTUFBTSxRQUFRLEtBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzlELE9BQU07S0FDUDtJQUNELDBCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJ1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCdcbmltcG9ydCBjbGllbnQsIHsgc3ViQ2xpZW50IH0gZnJvbSAnLi9jbGllbnQnXG5cbmNvbnN0IHJlZGlzU3Vic2NyaWJlID0gcHJvbWlzaWZ5KHN1YkNsaWVudC5zdWJzY3JpYmUuYmluZChzdWJDbGllbnQpKVxuY29uc3QgcmVkaXNQdWJsaXNoID0gcHJvbWlzaWZ5KGNsaWVudC5wdWJsaXNoLmJpbmQoY2xpZW50KSlcbmNvbnN0IHJlZGlzQ2xpZW50ID0gcHJvbWlzaWZ5KGNsaWVudC5jbGllbnQuYmluZChjbGllbnQpKVxuXG5jb25zdCBjaGFubmVsID0gYCR7Y2xpZW50LnNlbGVjdGVkX2RiIHx8IDB9OmNoYWxsLXVwZGF0ZXNgXG5jb25zdCBjbGllbnRJZCA9IHJlZGlzQ2xpZW50KCdpZCcpXG5cbmV4cG9ydCBjb25zdCBzdWJzY3JpYmVDaGFsbFVwZGF0ZSA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVkaXNTdWJzY3JpYmUoY2hhbm5lbClcbn1cblxuZXhwb3J0IGNvbnN0IHB1Ymxpc2hDaGFsbFVwZGF0ZSA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVkaXNQdWJsaXNoKGNoYW5uZWwsIGF3YWl0IGNsaWVudElkKVxufVxuXG5leHBvcnQgY29uc3QgY2hhbGxVcGRhdGVFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbnN1YkNsaWVudC5vbignbWVzc2FnZScsIGFzeW5jIChtc2dDaGFubmVsLCBtc2cpID0+IHtcbiAgaWYgKG1zZ0NoYW5uZWwgIT09IGNoYW5uZWwgfHwgYXdhaXQgY2xpZW50SWQgPT09IHBhcnNlSW50KG1zZykpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjaGFsbFVwZGF0ZUVtaXR0ZXIuZW1pdCgndXBkYXRlJylcbn0pXG4iXX0=