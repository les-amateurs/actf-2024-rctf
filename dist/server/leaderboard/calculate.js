"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const scores_1 = require("../util/scores");
const samples_1 = require("./samples");
const server_1 = __importDefault(require("../config/server"));
const { data: { solves, users, graphUpdate, allChallenges } } = worker_threads_1.workerData;
const solveAmount = new Map();
const challengeTiebreakEligibles = new Map();
for (let i = 0; i < allChallenges.length; i++) {
    const challenge = allChallenges[i];
    solveAmount.set(challenge.id, 0);
    challengeTiebreakEligibles.set(challenge.id, challenge.tiebreakEligible);
}
const userSolves = new Map();
const userTiebreakEligibleLastSolves = new Map();
const userLastSolves = new Map();
let lastIndex = 0;
const calculateScores = (sample) => {
    const challengeValues = new Map();
    const userScores = [];
    for (; lastIndex < solves.length; lastIndex++) {
        const challId = solves[lastIndex].challengeid;
        const userId = solves[lastIndex].userid;
        const createdAt = solves[lastIndex].createdat;
        if (createdAt > sample) {
            break;
        }
        const amt = solveAmount.get(challId);
        if (amt === undefined) {
            continue;
        }
        solveAmount.set(challId, amt + 1);
        userLastSolves.set(userId, createdAt);
        if (challengeTiebreakEligibles.get(challId) !== false) { // !== false because we default to true
            userTiebreakEligibleLastSolves.set(userId, createdAt);
        }
        // Store which challenges each user solved for later
        if (!userSolves.has(userId)) {
            userSolves.set(userId, [challId]);
        }
        else {
            userSolves.get(userId).push(challId);
        }
    }
    let maxSolveAmount = 0;
    for (let i = 0; i < allChallenges.length; i++) {
        const amt = solveAmount.get(allChallenges[i].id);
        if (amt > maxSolveAmount) {
            maxSolveAmount = amt;
        }
    }
    for (let i = 0; i < allChallenges.length; i++) {
        const challenge = allChallenges[i];
        challengeValues.set(challenge.id, scores_1.getScore(challenge.points.min, challenge.points.max, maxSolveAmount, solveAmount.get(challenge.id)));
    }
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        let currScore = 0;
        const lastTiebreakEligibleSolve = userTiebreakEligibleLastSolves.get(user.id);
        const lastSolve = userLastSolves.get(user.id);
        if (lastSolve === undefined)
            continue; // If the user has not solved any challenges, do not add to leaderboard
        const solvedChalls = userSolves.get(user.id);
        for (let j = 0; j < solvedChalls.length; j++) {
            // Add the score for the specific solve loaded from the challengeValues array using ids
            const value = challengeValues.get(solvedChalls[j]);
            if (value !== undefined) {
                currScore += value;
            }
        }
        userScores.push([
            user.id,
            user.name,
            user.division,
            currScore,
            lastTiebreakEligibleSolve,
            lastSolve
        ]);
    }
    return {
        challengeValues,
        userScores
    };
};
const userCompare = (a, b) => {
    var _a, _b;
    // sort the users by score
    // if two user's scores are the same, sort by last tiebreakEligible solve time
    // if neither user has any tiebreakEligible solves, sort by last solve time
    const scoreCompare = b[3] - a[3];
    if (scoreCompare !== 0) {
        return scoreCompare;
    }
    if (a[4] !== undefined || b[4] !== undefined) {
        return ((_a = a[4]) !== null && _a !== void 0 ? _a : Infinity) - ((_b = b[4]) !== null && _b !== void 0 ? _b : Infinity);
    }
    return a[5] - b[5];
};
const leaderboardUpdate = Math.min(Date.now(), server_1.default.endTime);
const samples = samples_1.calcSamples({
    start: Math.max(graphUpdate + 1, server_1.default.startTime),
    end: leaderboardUpdate
});
const graphLeaderboards = [];
samples.forEach((sample) => {
    const { userScores } = calculateScores(sample);
    graphLeaderboards.push({
        sample,
        scores: userScores.map((score) => [score[0], score[3]])
    });
});
const { userScores, challengeValues } = calculateScores(leaderboardUpdate);
const sortedUsers = userScores.sort(userCompare).map((user) => user.slice(0, 4));
worker_threads_1.parentPort.postMessage({
    leaderboard: sortedUsers,
    graphLeaderboards,
    challengeValues,
    solveAmount,
    leaderboardUpdate
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL2xlYWRlcmJvYXJkL2NhbGN1bGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1EQUF1RDtBQUN2RCwyQ0FBeUM7QUFDekMsdUNBQXVDO0FBQ3ZDLDhEQUFxQztBQUVyQyxNQUFNLEVBQ0osSUFBSSxFQUFFLEVBQ0osTUFBTSxFQUNOLEtBQUssRUFDTCxXQUFXLEVBQ1gsYUFBYSxFQUNkLEVBQ0YsR0FBRywyQkFBVSxDQUFBO0FBRWQsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUM3QixNQUFNLDBCQUEwQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDN0MsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNoQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtDQUN6RTtBQUNELE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDNUIsTUFBTSw4QkFBOEIsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ2hELE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDaEMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFBO0FBRWpCLE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDakMsTUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNqQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUE7SUFF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QUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd29ya2VyRGF0YSwgcGFyZW50UG9ydCB9IGZyb20gJ3dvcmtlcl90aHJlYWRzJ1xuaW1wb3J0IHsgZ2V0U2NvcmUgfSBmcm9tICcuLi91dGlsL3Njb3JlcydcbmltcG9ydCB7IGNhbGNTYW1wbGVzIH0gZnJvbSAnLi9zYW1wbGVzJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcvc2VydmVyJ1xuXG5jb25zdCB7XG4gIGRhdGE6IHtcbiAgICBzb2x2ZXMsXG4gICAgdXNlcnMsXG4gICAgZ3JhcGhVcGRhdGUsXG4gICAgYWxsQ2hhbGxlbmdlc1xuICB9XG59ID0gd29ya2VyRGF0YVxuXG5jb25zdCBzb2x2ZUFtb3VudCA9IG5ldyBNYXAoKVxuY29uc3QgY2hhbGxlbmdlVGllYnJlYWtFbGlnaWJsZXMgPSBuZXcgTWFwKClcbmZvciAobGV0IGkgPSAwOyBpIDwgYWxsQ2hhbGxlbmdlcy5sZW5ndGg7IGkrKykge1xuICBjb25zdCBjaGFsbGVuZ2UgPSBhbGxDaGFsbGVuZ2VzW2ldXG4gIHNvbHZlQW1vdW50LnNldChjaGFsbGVuZ2UuaWQsIDApXG4gIGNoYWxsZW5nZVRpZWJyZWFrRWxpZ2libGVzLnNldChjaGFsbGVuZ2UuaWQsIGNoYWxsZW5nZS50aWVicmVha0VsaWdpYmxlKVxufVxuY29uc3QgdXNlclNvbHZlcyA9IG5ldyBNYXAoKVxuY29uc3QgdXNlclRpZWJyZWFrRWxpZ2libGVMYXN0U29sdmVzID0gbmV3IE1hcCgpXG5jb25zdCB1c2VyTGFzdFNvbHZlcyA9IG5ldyBNYXAoKVxubGV0IGxhc3RJbmRleCA9IDBcblxuY29uc3QgY2FsY3VsYXRlU2NvcmVzID0gKHNhbXBsZSkgPT4ge1xuICBjb25zdCBjaGFsbGVuZ2VWYWx1ZXMgPSBuZXcgTWFwKClcbiAgY29uc3QgdXNlclNjb3JlcyA9IFtdXG5cbiAgZm9yICg7IGxhc3RJbmRleCA8IHNvbHZlcy5sZW5ndGg7IGxhc3RJbmRleCsrKSB7XG4gICAgY29uc3QgY2hhbGxJZCA9IHNvbHZlc1tsYXN0SW5kZXhdLmNoYWxsZW5nZWlkXG4gICAgY29uc3QgdXNlcklkID0gc29sdmVzW2xhc3RJbmRleF0udXNlcmlkXG4gICAgY29uc3QgY3JlYXRlZEF0ID0gc29sdmVzW2xhc3RJbmRleF0uY3JlYXRlZGF0XG5cbiAgICBpZiAoY3JlYXRlZEF0ID4gc2FtcGxlKSB7XG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGNvbnN0IGFtdCA9IHNvbHZlQW1vdW50LmdldChjaGFsbElkKVxuICAgIGlmIChhbXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgc29sdmVBbW91bnQuc2V0KGNoYWxsSWQsIGFtdCArIDEpXG5cbiAgICB1c2VyTGFzdFNvbHZlcy5zZXQodXNlcklkLCBjcmVhdGVkQXQpXG4gICAgaWYgKGNoYWxsZW5nZVRpZWJyZWFrRWxpZ2libGVzLmdldChjaGFsbElkKSAhPT0gZmFsc2UpIHsgLy8gIT09IGZhbHNlIGJlY2F1c2Ugd2UgZGVmYXVsdCB0byB0cnVlXG4gICAgICB1c2VyVGllYnJlYWtFbGlnaWJsZUxhc3RTb2x2ZXMuc2V0KHVzZXJJZCwgY3JlYXRlZEF0KVxuICAgIH1cbiAgICAvLyBTdG9yZSB3aGljaCBjaGFsbGVuZ2VzIGVhY2ggdXNlciBzb2x2ZWQgZm9yIGxhdGVyXG4gICAgaWYgKCF1c2VyU29sdmVzLmhhcyh1c2VySWQpKSB7XG4gICAgICB1c2VyU29sdmVzLnNldCh1c2VySWQsIFtjaGFsbElkXSlcbiAgICB9IGVsc2Uge1xuICAgICAgdXNlclNvbHZlcy5nZXQodXNlcklkKS5wdXNoKGNoYWxsSWQpXG4gICAgfVxuICB9XG5cbiAgbGV0IG1heFNvbHZlQW1vdW50ID0gMFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENoYWxsZW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhbXQgPSBzb2x2ZUFtb3VudC5nZXQoYWxsQ2hhbGxlbmdlc1tpXS5pZClcbiAgICBpZiAoYW10ID4gbWF4U29sdmVBbW91bnQpIHtcbiAgICAgIG1heFNvbHZlQW1vdW50ID0gYW10XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxDaGFsbGVuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hhbGxlbmdlID0gYWxsQ2hhbGxlbmdlc1tpXVxuICAgIGNoYWxsZW5nZVZhbHVlcy5zZXQoY2hhbGxlbmdlLmlkLCBnZXRTY29yZShcbiAgICAgIGNoYWxsZW5nZS5wb2ludHMubWluLFxuICAgICAgY2hhbGxlbmdlLnBvaW50cy5tYXgsXG4gICAgICBtYXhTb2x2ZUFtb3VudCxcbiAgICAgIHNvbHZlQW1vdW50LmdldChjaGFsbGVuZ2UuaWQpXG4gICAgKSlcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB1c2VyID0gdXNlcnNbaV1cbiAgICBsZXQgY3VyclNjb3JlID0gMFxuICAgIGNvbnN0IGxhc3RUaWVicmVha0VsaWdpYmxlU29sdmUgPSB1c2VyVGllYnJlYWtFbGlnaWJsZUxhc3RTb2x2ZXMuZ2V0KHVzZXIuaWQpXG4gICAgY29uc3QgbGFzdFNvbHZlID0gdXNlckxhc3RTb2x2ZXMuZ2V0KHVzZXIuaWQpXG4gICAgaWYgKGxhc3RTb2x2ZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZSAvLyBJZiB0aGUgdXNlciBoYXMgbm90IHNvbHZlZCBhbnkgY2hhbGxlbmdlcywgZG8gbm90IGFkZCB0byBsZWFkZXJib2FyZFxuICAgIGNvbnN0IHNvbHZlZENoYWxscyA9IHVzZXJTb2x2ZXMuZ2V0KHVzZXIuaWQpXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzb2x2ZWRDaGFsbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIC8vIEFkZCB0aGUgc2NvcmUgZm9yIHRoZSBzcGVjaWZpYyBzb2x2ZSBsb2FkZWQgZnJvbSB0aGUgY2hhbGxlbmdlVmFsdWVzIGFycmF5IHVzaW5nIGlkc1xuICAgICAgY29uc3QgdmFsdWUgPSBjaGFsbGVuZ2VWYWx1ZXMuZ2V0KHNvbHZlZENoYWxsc1tqXSlcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGN1cnJTY29yZSArPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICB1c2VyU2NvcmVzLnB1c2goW1xuICAgICAgdXNlci5pZCxcbiAgICAgIHVzZXIubmFtZSxcbiAgICAgIHVzZXIuZGl2aXNpb24sXG4gICAgICBjdXJyU2NvcmUsXG4gICAgICBsYXN0VGllYnJlYWtFbGlnaWJsZVNvbHZlLFxuICAgICAgbGFzdFNvbHZlXG4gICAgXSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2hhbGxlbmdlVmFsdWVzLFxuICAgIHVzZXJTY29yZXNcbiAgfVxufVxuXG5jb25zdCB1c2VyQ29tcGFyZSA9IChhLCBiKSA9PiB7XG4gIC8vIHNvcnQgdGhlIHVzZXJzIGJ5IHNjb3JlXG4gIC8vIGlmIHR3byB1c2VyJ3Mgc2NvcmVzIGFyZSB0aGUgc2FtZSwgc29ydCBieSBsYXN0IHRpZWJyZWFrRWxpZ2libGUgc29sdmUgdGltZVxuICAvLyBpZiBuZWl0aGVyIHVzZXIgaGFzIGFueSB0aWVicmVha0VsaWdpYmxlIHNvbHZlcywgc29ydCBieSBsYXN0IHNvbHZlIHRpbWVcbiAgY29uc3Qgc2NvcmVDb21wYXJlID0gYlszXSAtIGFbM11cbiAgaWYgKHNjb3JlQ29tcGFyZSAhPT0gMCkge1xuICAgIHJldHVybiBzY29yZUNvbXBhcmVcbiAgfVxuICBpZiAoYVs0XSAhPT0gdW5kZWZpbmVkIHx8IGJbNF0gIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAoYVs0XSA/PyBJbmZpbml0eSkgLSAoYls0XSA/PyBJbmZpbml0eSlcbiAgfVxuICByZXR1cm4gYVs1XSAtIGJbNV1cbn1cblxuY29uc3QgbGVhZGVyYm9hcmRVcGRhdGUgPSBNYXRoLm1pbihEYXRlLm5vdygpLCBjb25maWcuZW5kVGltZSlcbmNvbnN0IHNhbXBsZXMgPSBjYWxjU2FtcGxlcyh7XG4gIHN0YXJ0OiBNYXRoLm1heChncmFwaFVwZGF0ZSArIDEsIGNvbmZpZy5zdGFydFRpbWUpLFxuICBlbmQ6IGxlYWRlcmJvYXJkVXBkYXRlXG59KVxuXG5jb25zdCBncmFwaExlYWRlcmJvYXJkcyA9IFtdXG5zYW1wbGVzLmZvckVhY2goKHNhbXBsZSkgPT4ge1xuICBjb25zdCB7IHVzZXJTY29yZXMgfSA9IGNhbGN1bGF0ZVNjb3JlcyhzYW1wbGUpXG4gIGdyYXBoTGVhZGVyYm9hcmRzLnB1c2goe1xuICAgIHNhbXBsZSxcbiAgICBzY29yZXM6IHVzZXJTY29yZXMubWFwKChzY29yZSkgPT4gW3Njb3JlWzBdLCBzY29yZVszXV0pXG4gIH0pXG59KVxuXG5jb25zdCB7IHVzZXJTY29yZXMsIGNoYWxsZW5nZVZhbHVlcyB9ID0gY2FsY3VsYXRlU2NvcmVzKGxlYWRlcmJvYXJkVXBkYXRlKVxuY29uc3Qgc29ydGVkVXNlcnMgPSB1c2VyU2NvcmVzLnNvcnQodXNlckNvbXBhcmUpLm1hcCgodXNlcikgPT4gdXNlci5zbGljZSgwLCA0KSlcblxucGFyZW50UG9ydC5wb3N0TWVzc2FnZSh7XG4gIGxlYWRlcmJvYXJkOiBzb3J0ZWRVc2VycyxcbiAgZ3JhcGhMZWFkZXJib2FyZHMsXG4gIGNoYWxsZW5nZVZhbHVlcyxcbiAgc29sdmVBbW91bnQsXG4gIGxlYWRlcmJvYXJkVXBkYXRlXG59KVxuIl19