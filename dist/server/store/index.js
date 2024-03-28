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
exports.deleteItem = exports.updateItem = exports.resetCache = exports.getItem = exports.getAllItems = void 0;
const server_1 = __importDefault(require("../config/server"));
const path_1 = __importDefault(require("path"));
const challs_1 = require("../cache/challs");
let provider;
let items = [];
let itemsMap = new Map();
const onUpdate = (newItems) => {
    items = newItems;
    itemsMap = new Map(newItems.map((c) => [c.id, c]));
};
void Promise.resolve().then(() => __importStar(require(path_1.default.join('../providers', server_1.default.storeProvider.name)))).then(({ default: Provider }) => {
    var _a;
    provider = new Provider((_a = server_1.default.storeProvider.options) !== null && _a !== void 0 ? _a : {});
    provider.on('update', onUpdate);
});
challs_1.challUpdateEmitter.on('update', () => {
    provider.forceUpdate();
});
function getAllItems() {
    return items;
}
exports.getAllItems = getAllItems;
function getItem(id) {
    return itemsMap.get(id);
}
exports.getItem = getItem;
function resetCache() {
    provider.forceUpdate();
}
exports.resetCache = resetCache;
async function updateItem(item) {
    await provider.updateItem(item);
    // await publishChallUpdate()
}
exports.updateItem = updateItem;
async function deleteItem(id) {
    await provider.deleteItem(id);
    // await publishChallUpdate()
}
exports.deleteItem = deleteItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvc3RvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUFxQztBQUNyQyxnREFBdUI7QUFHdkIsNENBQXdFO0FBR3hFLElBQUksUUFBa0IsQ0FBQTtBQUV0QixJQUFJLEtBQUssR0FBVyxFQUFFLENBQUE7QUFFdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUE7QUFFdEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFRLEVBQUU7SUFDMUMsS0FBSyxHQUFHLFFBQVEsQ0FBQTtJQUNoQixRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNwRCxDQUFDLENBQUE7QUFFRCxLQUFLLGtEQUFPLGNBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGdCQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUM3RCxJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQW9DLEVBQVEsRUFBRTs7SUFDdEUsUUFBUSxHQUFHLElBQUksUUFBUSxPQUFDLGdCQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUE7SUFFM0QsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBR0g7QUFBQywyQkFBbUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUN0RCxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUE7QUFDeEIsQ0FBQyxDQUFDLENBQUE7QUFFRixTQUFnQixXQUFXO0lBQ3pCLE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQztBQUZELGtDQUVDO0FBRUQsU0FBZ0IsT0FBTyxDQUFFLEVBQVU7SUFDakMsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3pCLENBQUM7QUFGRCwwQkFFQztBQUVELFNBQWdCLFVBQVU7SUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQ3hCLENBQUM7QUFGRCxnQ0FFQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQUUsSUFBVTtJQUMxQyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDL0IsNkJBQTZCO0FBQy9CLENBQUM7QUFIRCxnQ0FHQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQUUsRUFBVTtJQUMxQyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDN0IsNkJBQTZCO0FBQy9CLENBQUM7QUFIRCxnQ0FHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL3NlcnZlcidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBJdGVtLCBQdXJjaGFzZSB9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgeyBQcm92aWRlciwgUHJvdmlkZXJDb25zdHJ1Y3RvciB9IGZyb20gJy4vUHJvdmlkZXInXG5pbXBvcnQgeyBjaGFsbFVwZGF0ZUVtaXR0ZXIsIHB1Ymxpc2hDaGFsbFVwZGF0ZSB9IGZyb20gJy4uL2NhY2hlL2NoYWxscydcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cydcblxubGV0IHByb3ZpZGVyOiBQcm92aWRlclxuXG5sZXQgaXRlbXM6IEl0ZW1bXSA9IFtdXG5cbmxldCBpdGVtc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBJdGVtPigpXG5cbmNvbnN0IG9uVXBkYXRlID0gKG5ld0l0ZW1zOiBJdGVtW10pOiB2b2lkID0+IHtcbiAgaXRlbXMgPSBuZXdJdGVtc1xuICBpdGVtc01hcCA9IG5ldyBNYXAobmV3SXRlbXMubWFwKChjKSA9PiBbYy5pZCwgY10pKVxufVxuXG52b2lkIGltcG9ydChwYXRoLmpvaW4oJy4uL3Byb3ZpZGVycycsIGNvbmZpZy5zdG9yZVByb3ZpZGVyLm5hbWUpKVxuICAudGhlbigoeyBkZWZhdWx0OiBQcm92aWRlciB9OiB7IGRlZmF1bHQ6IFByb3ZpZGVyQ29uc3RydWN0b3IgfSk6IHZvaWQgPT4ge1xuICAgIHByb3ZpZGVyID0gbmV3IFByb3ZpZGVyKGNvbmZpZy5zdG9yZVByb3ZpZGVyLm9wdGlvbnMgPz8ge30pXG5cbiAgICBwcm92aWRlci5vbigndXBkYXRlJywgb25VcGRhdGUpXG4gIH0pXG5cbi8vIEZJWE1FOiByZW1vdmUgY2FzdCBvbmNlIGNhY2hlIGlzIHR5cGVkXG47KGNoYWxsVXBkYXRlRW1pdHRlciBhcyBFdmVudEVtaXR0ZXIpLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gIHByb3ZpZGVyLmZvcmNlVXBkYXRlKClcbn0pXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxJdGVtcyAoKTogSXRlbVtdIHtcbiAgcmV0dXJuIGl0ZW1zXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtIChpZDogc3RyaW5nKTogSXRlbSB8IHVuZGVmaW5lZCB7XG4gIHJldHVybiBpdGVtc01hcC5nZXQoaWQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldENhY2hlICgpOiB2b2lkIHtcbiAgcHJvdmlkZXIuZm9yY2VVcGRhdGUoKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlSXRlbSAoaXRlbTogSXRlbSk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBwcm92aWRlci51cGRhdGVJdGVtKGl0ZW0pXG4gIC8vIGF3YWl0IHB1Ymxpc2hDaGFsbFVwZGF0ZSgpXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVJdGVtIChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IHByb3ZpZGVyLmRlbGV0ZUl0ZW0oaWQpXG4gIC8vIGF3YWl0IHB1Ymxpc2hDaGFsbFVwZGF0ZSgpXG59XG4iXX0=