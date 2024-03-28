"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcSamples = void 0;
const server_1 = __importDefault(require("../config/server"));
const graphSampleTime = server_1.default.leaderboard.graphSampleTime;
exports.calcSamples = ({ start, end }) => {
    const samples = [];
    const sampleStart = Math.ceil(start / graphSampleTime) * graphSampleTime;
    const sampleEnd = Math.floor(end / graphSampleTime) * graphSampleTime;
    for (let sample = sampleStart; sample <= sampleEnd; sample += graphSampleTime) {
        samples.push(sample);
    }
    return samples;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9sZWFkZXJib2FyZC9zYW1wbGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhEQUFxQztBQUVyQyxNQUFNLGVBQWUsR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUE7QUFFN0MsUUFBQSxXQUFXLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQzVDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsR0FBRyxlQUFlLENBQUE7SUFDeEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDLEdBQUcsZUFBZSxDQUFBO0lBRXJFLEtBQUssSUFBSSxNQUFNLEdBQUcsV0FBVyxFQUFFLE1BQU0sSUFBSSxTQUFTLEVBQUUsTUFBTSxJQUFJLGVBQWUsRUFBRTtRQUM3RSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3JCO0lBQ0QsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcvc2VydmVyJ1xuXG5jb25zdCBncmFwaFNhbXBsZVRpbWUgPSBjb25maWcubGVhZGVyYm9hcmQuZ3JhcGhTYW1wbGVUaW1lXG5cbmV4cG9ydCBjb25zdCBjYWxjU2FtcGxlcyA9ICh7IHN0YXJ0LCBlbmQgfSkgPT4ge1xuICBjb25zdCBzYW1wbGVzID0gW11cbiAgY29uc3Qgc2FtcGxlU3RhcnQgPSBNYXRoLmNlaWwoc3RhcnQgLyBncmFwaFNhbXBsZVRpbWUpICogZ3JhcGhTYW1wbGVUaW1lXG4gIGNvbnN0IHNhbXBsZUVuZCA9IE1hdGguZmxvb3IoZW5kIC8gZ3JhcGhTYW1wbGVUaW1lKSAqIGdyYXBoU2FtcGxlVGltZVxuXG4gIGZvciAobGV0IHNhbXBsZSA9IHNhbXBsZVN0YXJ0OyBzYW1wbGUgPD0gc2FtcGxlRW5kOyBzYW1wbGUgKz0gZ3JhcGhTYW1wbGVUaW1lKSB7XG4gICAgc2FtcGxlcy5wdXNoKHNhbXBsZSlcbiAgfVxuICByZXR1cm4gc2FtcGxlc1xufVxuIl19