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
const util_1 = require("../../../challenges/util");
const events_1 = require("events");
const db = __importStar(require("../../../database"));
const util_2 = require("../../../util");
class DatabaseProvider extends events_1.EventEmitter {
    constructor() {
        super();
        this.challenges = [];
        void this.update();
    }
    async update() {
        try {
            const dbchallenges = await db.challenges.getAllChallenges();
            this.challenges = dbchallenges.map(({ id, data }) => {
                return {
                    ...data,
                    id
                };
            });
            this.emit('update', this.challenges);
        }
        catch (e) {
            // TODO: wrap error?
            this.emit('error', e);
        }
    }
    forceUpdate() {
        void this.update();
    }
    challengeToRow(chall) {
        chall = util_2.deepCopy(chall);
        const id = chall.id;
        delete chall.id;
        return {
            id,
            data: chall
        };
    }
    async updateChallenge(chall) {
        const originalData = await db.challenges.getChallengeById({
            id: chall.id
        });
        // If we're inserting, have sane defaults
        if (originalData === undefined) {
            chall = util_1.applyChallengeDefaults(chall);
        }
        else {
            chall = {
                ...originalData.data,
                ...chall
            };
        }
        const data = this.challengeToRow(chall);
        await db.challenges.upsertChallenge(data);
        void this.update();
    }
    async deleteChallenge(id) {
        await db.challenges.removeChallengeById({ id: id });
        void this.update();
    }
    cleanup() {
        // do nothing
    }
}
exports.default = DatabaseProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zZXJ2ZXIvcHJvdmlkZXJzL2NoYWxsZW5nZXMvZGF0YWJhc2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbURBQWlFO0FBRWpFLG1DQUFxQztBQUVyQyxzREFBdUM7QUFFdkMsd0NBQXdDO0FBRXhDLE1BQU0sZ0JBQWlCLFNBQVEscUJBQVk7SUFHekM7UUFDRSxLQUFLLEVBQUUsQ0FBQTtRQUhELGVBQVUsR0FBZ0IsRUFBRSxDQUFBO1FBSWxDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFTyxLQUFLLENBQUMsTUFBTTtRQUNsQixJQUFJO1lBQ0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUE7WUFFM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDbEQsT0FBTztvQkFDTCxHQUFHLElBQUk7b0JBQ1AsRUFBRTtpQkFDSCxDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7U0FDckM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN0QjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELGNBQWMsQ0FBRSxLQUFnQjtRQUM5QixLQUFLLEdBQUcsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXZCLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUE7UUFDbkIsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFBO1FBRWYsT0FBTztZQUNMLEVBQUU7WUFDRixJQUFJLEVBQUUsS0FBSztTQUNaLENBQUE7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBRSxLQUFnQjtRQUNyQyxNQUFNLFlBQVksR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7WUFDeEQsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1NBQ2IsQ0FBQyxDQUFBO1FBRUYseUNBQXlDO1FBQ3pDLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUM5QixLQUFLLEdBQUcsNkJBQXNCLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDdEM7YUFBTTtZQUNMLEtBQUssR0FBRztnQkFDTixHQUFHLFlBQVksQ0FBQyxJQUFJO2dCQUNwQixHQUFHLEtBQUs7YUFDVCxDQUFBO1NBQ0Y7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXZDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFekMsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQUUsRUFBVTtRQUMvQixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUVuRCxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBRUQsT0FBTztRQUNMLGFBQWE7SUFDZixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxnQkFBZ0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYWxsZW5nZSB9IGZyb20gJy4uLy4uLy4uL2NoYWxsZW5nZXMvdHlwZXMnXG5pbXBvcnQgeyBhcHBseUNoYWxsZW5nZURlZmF1bHRzIH0gZnJvbSAnLi4vLi4vLi4vY2hhbGxlbmdlcy91dGlsJ1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICcuLi8uLi8uLi9jaGFsbGVuZ2VzL1Byb3ZpZGVyJ1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJ1xuXG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi8uLi8uLi9kYXRhYmFzZSdcbmltcG9ydCB7IERhdGFiYXNlQ2hhbGxlbmdlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YWJhc2UvY2hhbGxlbmdlcydcbmltcG9ydCB7IGRlZXBDb3B5IH0gZnJvbSAnLi4vLi4vLi4vdXRpbCdcblxuY2xhc3MgRGF0YWJhc2VQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciBpbXBsZW1lbnRzIFByb3ZpZGVyIHtcbiAgcHJpdmF0ZSBjaGFsbGVuZ2VzOiBDaGFsbGVuZ2VbXSA9IFtdXG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB2b2lkIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdXBkYXRlICgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGJjaGFsbGVuZ2VzID0gYXdhaXQgZGIuY2hhbGxlbmdlcy5nZXRBbGxDaGFsbGVuZ2VzKClcblxuICAgICAgdGhpcy5jaGFsbGVuZ2VzID0gZGJjaGFsbGVuZ2VzLm1hcCgoeyBpZCwgZGF0YSB9KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICBpZFxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICB0aGlzLmVtaXQoJ3VwZGF0ZScsIHRoaXMuY2hhbGxlbmdlcylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPOiB3cmFwIGVycm9yP1xuICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGUpXG4gICAgfVxuICB9XG5cbiAgZm9yY2VVcGRhdGUgKCk6IHZvaWQge1xuICAgIHZvaWQgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgY2hhbGxlbmdlVG9Sb3cgKGNoYWxsOiBDaGFsbGVuZ2UpOiBEYXRhYmFzZUNoYWxsZW5nZSB7XG4gICAgY2hhbGwgPSBkZWVwQ29weShjaGFsbClcblxuICAgIGNvbnN0IGlkID0gY2hhbGwuaWRcbiAgICBkZWxldGUgY2hhbGwuaWRcblxuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIGRhdGE6IGNoYWxsXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlQ2hhbGxlbmdlIChjaGFsbDogQ2hhbGxlbmdlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRhID0gYXdhaXQgZGIuY2hhbGxlbmdlcy5nZXRDaGFsbGVuZ2VCeUlkKHtcbiAgICAgIGlkOiBjaGFsbC5pZFxuICAgIH0pXG5cbiAgICAvLyBJZiB3ZSdyZSBpbnNlcnRpbmcsIGhhdmUgc2FuZSBkZWZhdWx0c1xuICAgIGlmIChvcmlnaW5hbERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY2hhbGwgPSBhcHBseUNoYWxsZW5nZURlZmF1bHRzKGNoYWxsKVxuICAgIH0gZWxzZSB7XG4gICAgICBjaGFsbCA9IHtcbiAgICAgICAgLi4ub3JpZ2luYWxEYXRhLmRhdGEsXG4gICAgICAgIC4uLmNoYWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuY2hhbGxlbmdlVG9Sb3coY2hhbGwpXG5cbiAgICBhd2FpdCBkYi5jaGFsbGVuZ2VzLnVwc2VydENoYWxsZW5nZShkYXRhKVxuXG4gICAgdm9pZCB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBhc3luYyBkZWxldGVDaGFsbGVuZ2UgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBkYi5jaGFsbGVuZ2VzLnJlbW92ZUNoYWxsZW5nZUJ5SWQoeyBpZDogaWQgfSlcblxuICAgIHZvaWQgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgY2xlYW51cCAoKTogdm9pZCB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFiYXNlUHJvdmlkZXJcbiJdfQ==