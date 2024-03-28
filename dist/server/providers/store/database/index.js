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
const events_1 = require("events");
const db = __importStar(require("../../../database"));
const util_1 = require("../../../store/util");
class DatabaseProvider extends events_1.EventEmitter {
    constructor() {
        super();
        this.items = [];
        this.purchases = [];
        void this.update();
    }
    async update() {
        try {
            const dbchallenges = await db.store.getAllItems();
            this.items = dbchallenges;
            this.emit('update', this.items);
        }
        catch (e) {
            // TODO: wrap error?
            this.emit('error', e);
        }
    }
    forceUpdate() {
        void this.update();
    }
    async updateItem(item) {
        const originalData = await db.store.getItemById({
            id: item.id
        });
        // If we're inserting, have sane defaults
        if (originalData === undefined) {
            item = util_1.applyItemDefaults(item);
        }
        else {
            item = {
                ...originalData,
                ...item
            };
        }
        await db.store.upsertItem(item);
        void this.update();
    }
    async deleteItem(id) {
        await db.store.removeItemById({ id: id });
        void this.update();
    }
    cleanup() {
        // do nothing
    }
}
exports.default = DatabaseProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvcHJvdmlkZXJzL3N0b3JlL2RhdGFiYXNlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFxQztBQUVyQyxzREFBdUM7QUFHdkMsOENBQXVEO0FBRXZELE1BQU0sZ0JBQWlCLFNBQVEscUJBQVk7SUFJekM7UUFDRSxLQUFLLEVBQUUsQ0FBQTtRQUpELFVBQUssR0FBVyxFQUFFLENBQUE7UUFDbEIsY0FBUyxHQUFlLEVBQUUsQ0FBQTtRQUloQyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBRU8sS0FBSyxDQUFDLE1BQU07UUFDbEIsSUFBSTtZQUNGLE1BQU0sWUFBWSxHQUFHLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUVqRCxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQTtZQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDaEM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN0QjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUUsSUFBVTtRQUMxQixNQUFNLFlBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQzlDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNaLENBQUMsQ0FBQTtRQUVGLHlDQUF5QztRQUN6QyxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxHQUFHLHdCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO1NBQy9CO2FBQU07WUFDTCxJQUFJLEdBQUc7Z0JBQ0wsR0FBRyxZQUFZO2dCQUNmLEdBQUcsSUFBSTthQUNSLENBQUE7U0FDRjtRQUVELE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFL0IsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUUsRUFBVTtRQUMxQixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFFekMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELE9BQU87UUFDTCxhQUFhO0lBQ2YsQ0FBQztDQUNGO0FBRUQsa0JBQWUsZ0JBQWdCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnXG5cbmltcG9ydCAqIGFzIGRiIGZyb20gJy4uLy4uLy4uL2RhdGFiYXNlJ1xuaW1wb3J0IHsgSXRlbSwgUHVyY2hhc2UgfSBmcm9tICcuLi8uLi8uLi9zdG9yZS90eXBlcydcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUvUHJvdmlkZXInXG5pbXBvcnQgeyBhcHBseUl0ZW1EZWZhdWx0cyB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3V0aWwnXG5cbmNsYXNzIERhdGFiYXNlUHJvdmlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIgaW1wbGVtZW50cyBQcm92aWRlciB7XG4gIHByaXZhdGUgaXRlbXM6IEl0ZW1bXSA9IFtdXG4gIHByaXZhdGUgcHVyY2hhc2VzOiBQdXJjaGFzZVtdID0gW11cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHZvaWQgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB1cGRhdGUgKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYmNoYWxsZW5nZXMgPSBhd2FpdCBkYi5zdG9yZS5nZXRBbGxJdGVtcygpXG5cbiAgICAgIHRoaXMuaXRlbXMgPSBkYmNoYWxsZW5nZXNcblxuICAgICAgdGhpcy5lbWl0KCd1cGRhdGUnLCB0aGlzLml0ZW1zKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFRPRE86IHdyYXAgZXJyb3I/XG4gICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZSlcbiAgICB9XG4gIH1cblxuICBmb3JjZVVwZGF0ZSAoKTogdm9pZCB7XG4gICAgdm9pZCB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBhc3luYyB1cGRhdGVJdGVtIChpdGVtOiBJdGVtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRhID0gYXdhaXQgZGIuc3RvcmUuZ2V0SXRlbUJ5SWQoe1xuICAgICAgaWQ6IGl0ZW0uaWRcbiAgICB9KVxuXG4gICAgLy8gSWYgd2UncmUgaW5zZXJ0aW5nLCBoYXZlIHNhbmUgZGVmYXVsdHNcbiAgICBpZiAob3JpZ2luYWxEYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZW0gPSBhcHBseUl0ZW1EZWZhdWx0cyhpdGVtKVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtID0ge1xuICAgICAgICAuLi5vcmlnaW5hbERhdGEsXG4gICAgICAgIC4uLml0ZW1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhd2FpdCBkYi5zdG9yZS51cHNlcnRJdGVtKGl0ZW0pXG5cbiAgICB2b2lkIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZUl0ZW0gKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBkYi5zdG9yZS5yZW1vdmVJdGVtQnlJZCh7IGlkOiBpZCB9KVxuXG4gICAgdm9pZCB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBjbGVhbnVwKCk6IHZvaWQge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhYmFzZVByb3ZpZGVyXG4iXX0=