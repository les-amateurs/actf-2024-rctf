"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyChallengeDefaults = void 0;
const util_1 = require("../util");
const ChallengeDefaults = {
    id: '',
    name: '',
    description: '',
    category: '',
    author: '',
    files: [],
    tiebreakEligible: true,
    points: {
        min: 0,
        max: 0
    },
    flag: ''
};
exports.applyChallengeDefaults = (chall) => {
    const copy = util_1.deepCopy(ChallengeDefaults);
    return {
        ...copy,
        ...chall
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9jaGFsbGVuZ2VzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esa0NBQWtDO0FBRWxDLE1BQU0saUJBQWlCLEdBQWM7SUFDbkMsRUFBRSxFQUFFLEVBQUU7SUFDTixJQUFJLEVBQUUsRUFBRTtJQUNSLFdBQVcsRUFBRSxFQUFFO0lBQ2YsUUFBUSxFQUFFLEVBQUU7SUFDWixNQUFNLEVBQUUsRUFBRTtJQUNWLEtBQUssRUFBRSxFQUFFO0lBQ1QsZ0JBQWdCLEVBQUUsSUFBSTtJQUN0QixNQUFNLEVBQUU7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDO0tBQ1A7SUFDRCxJQUFJLEVBQUUsRUFBRTtDQUNULENBQUE7QUFFWSxRQUFBLHNCQUFzQixHQUFHLENBQUMsS0FBZ0IsRUFBYSxFQUFFO0lBQ3BFLE1BQU0sSUFBSSxHQUFHLGVBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBRXhDLE9BQU87UUFDTCxHQUFHLElBQUk7UUFDUCxHQUFHLEtBQUs7S0FDVCxDQUFBO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbGxlbmdlIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7IGRlZXBDb3B5IH0gZnJvbSAnLi4vdXRpbCdcblxuY29uc3QgQ2hhbGxlbmdlRGVmYXVsdHM6IENoYWxsZW5nZSA9IHtcbiAgaWQ6ICcnLFxuICBuYW1lOiAnJyxcbiAgZGVzY3JpcHRpb246ICcnLFxuICBjYXRlZ29yeTogJycsXG4gIGF1dGhvcjogJycsXG4gIGZpbGVzOiBbXSxcbiAgdGllYnJlYWtFbGlnaWJsZTogdHJ1ZSxcbiAgcG9pbnRzOiB7XG4gICAgbWluOiAwLFxuICAgIG1heDogMFxuICB9LFxuICBmbGFnOiAnJ1xufVxuXG5leHBvcnQgY29uc3QgYXBwbHlDaGFsbGVuZ2VEZWZhdWx0cyA9IChjaGFsbDogQ2hhbGxlbmdlKTogQ2hhbGxlbmdlID0+IHtcbiAgY29uc3QgY29weSA9IGRlZXBDb3B5KENoYWxsZW5nZURlZmF1bHRzKVxuXG4gIHJldHVybiB7XG4gICAgLi4uY29weSxcbiAgICAuLi5jaGFsbFxuICB9XG59XG4iXX0=