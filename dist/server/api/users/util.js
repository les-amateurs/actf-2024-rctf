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
exports.getUserData = exports.getGenericUserData = void 0;
const db = __importStar(require("../../database"));
const challenges = __importStar(require("../../challenges"));
const cache = __importStar(require("../../cache"));
const leaderboard_1 = require("../../cache/leaderboard");
exports.getGenericUserData = async ({ id }) => {
    const user = await db.users.getUserById({ id });
    if (user === undefined)
        return null;
    return exports.getUserData({ user });
};
exports.getUserData = async ({ user }) => {
    let [{ userSolves, challengeInfo }, score] = await Promise.all([
        (async () => {
            const userSolves = await db.solves.getSolvesByUserId({ userid: user.id });
            const challengeInfo = await leaderboard_1.getChallengeInfo({
                ids: userSolves.map((solve) => solve.challengeid)
            });
            return { userSolves, challengeInfo };
        })(),
        cache.leaderboard.getScore({ id: user.id })
    ]);
    if (score === null) {
        score = {
            score: 0,
            globalPlace: null,
            divisionPlace: null
        };
    }
    const solves = [];
    userSolves.forEach((solve, i) => {
        const chall = challenges.getCleanedChallenge(solve.challengeid);
        // Ignore challenges with invalid id, potentially deleted challs
        if (chall === undefined)
            return;
        solves.push({
            category: chall.category,
            name: chall.name,
            points: challengeInfo[i].score,
            solves: challengeInfo[i].solves,
            id: chall.id,
            createdAt: solve.createdat.valueOf()
        });
    });
    return {
        name: user.name,
        ctftimeId: user.ctftime_id,
        division: user.division,
        score: score.score,
        globalPlace: score.globalPlace,
        divisionPlace: score.divisionPlace,
        solves,
        items: await db.store.getItemIdsByUserId({ userid: user.id }),
        equippedItems: await db.store.getEquippedItems({ userid: user.id }),
        chips: user.chips,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NlcnZlci9hcGkvdXNlcnMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQW9DO0FBQ3BDLDZEQUE4QztBQUM5QyxtREFBb0M7QUFDcEMseURBQTBEO0FBRTdDLFFBQUEsa0JBQWtCLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUNqRCxNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUMvQyxJQUFJLElBQUksS0FBSyxTQUFTO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFFbkMsT0FBTyxtQkFBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUM5QixDQUFDLENBQUE7QUFFWSxRQUFBLFdBQVcsR0FBRyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO0lBQzVDLElBQUksQ0FDRixFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsRUFDN0IsS0FBSyxDQUNOLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3BCLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDVixNQUFNLFVBQVUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDekUsTUFBTSxhQUFhLEdBQUcsTUFBTSw4QkFBZ0IsQ0FBQztnQkFDM0MsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7YUFDbEQsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsQ0FBQTtRQUN0QyxDQUFDLENBQUMsRUFBRTtRQUNKLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUM1QyxDQUFDLENBQUE7SUFFRixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDbEIsS0FBSyxHQUFHO1lBQ04sS0FBSyxFQUFFLENBQUM7WUFDUixXQUFXLEVBQUUsSUFBSTtZQUNqQixhQUFhLEVBQUUsSUFBSTtTQUNwQixDQUFBO0tBQ0Y7SUFFRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFakIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM5QixNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRS9ELGdFQUFnRTtRQUNoRSxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQUUsT0FBTTtRQUUvQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1YsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDOUIsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQy9CLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNaLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtTQUNyQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU87UUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7UUFDZixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7UUFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1FBQ3ZCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztRQUNsQixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7UUFDOUIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhO1FBQ2xDLE1BQU07UUFDTixLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUM3RCxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNuRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7S0FDbEIsQ0FBQTtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRiIGZyb20gJy4uLy4uL2RhdGFiYXNlJ1xuaW1wb3J0ICogYXMgY2hhbGxlbmdlcyBmcm9tICcuLi8uLi9jaGFsbGVuZ2VzJ1xuaW1wb3J0ICogYXMgY2FjaGUgZnJvbSAnLi4vLi4vY2FjaGUnXG5pbXBvcnQgeyBnZXRDaGFsbGVuZ2VJbmZvIH0gZnJvbSAnLi4vLi4vY2FjaGUvbGVhZGVyYm9hcmQnXG5cbmV4cG9ydCBjb25zdCBnZXRHZW5lcmljVXNlckRhdGEgPSBhc3luYyAoeyBpZCB9KSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBkYi51c2Vycy5nZXRVc2VyQnlJZCh7IGlkIH0pXG4gIGlmICh1c2VyID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsXG5cbiAgcmV0dXJuIGdldFVzZXJEYXRhKHsgdXNlciB9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0VXNlckRhdGEgPSBhc3luYyAoeyB1c2VyIH0pID0+IHtcbiAgbGV0IFtcbiAgICB7IHVzZXJTb2x2ZXMsIGNoYWxsZW5nZUluZm8gfSxcbiAgICBzY29yZVxuICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB1c2VyU29sdmVzID0gYXdhaXQgZGIuc29sdmVzLmdldFNvbHZlc0J5VXNlcklkKHsgdXNlcmlkOiB1c2VyLmlkIH0pXG4gICAgICBjb25zdCBjaGFsbGVuZ2VJbmZvID0gYXdhaXQgZ2V0Q2hhbGxlbmdlSW5mbyh7XG4gICAgICAgIGlkczogdXNlclNvbHZlcy5tYXAoKHNvbHZlKSA9PiBzb2x2ZS5jaGFsbGVuZ2VpZClcbiAgICAgIH0pXG4gICAgICByZXR1cm4geyB1c2VyU29sdmVzLCBjaGFsbGVuZ2VJbmZvIH1cbiAgICB9KSgpLFxuICAgIGNhY2hlLmxlYWRlcmJvYXJkLmdldFNjb3JlKHsgaWQ6IHVzZXIuaWQgfSlcbiAgXSlcblxuICBpZiAoc2NvcmUgPT09IG51bGwpIHtcbiAgICBzY29yZSA9IHtcbiAgICAgIHNjb3JlOiAwLFxuICAgICAgZ2xvYmFsUGxhY2U6IG51bGwsXG4gICAgICBkaXZpc2lvblBsYWNlOiBudWxsXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc29sdmVzID0gW11cblxuICB1c2VyU29sdmVzLmZvckVhY2goKHNvbHZlLCBpKSA9PiB7XG4gICAgY29uc3QgY2hhbGwgPSBjaGFsbGVuZ2VzLmdldENsZWFuZWRDaGFsbGVuZ2Uoc29sdmUuY2hhbGxlbmdlaWQpXG5cbiAgICAvLyBJZ25vcmUgY2hhbGxlbmdlcyB3aXRoIGludmFsaWQgaWQsIHBvdGVudGlhbGx5IGRlbGV0ZWQgY2hhbGxzXG4gICAgaWYgKGNoYWxsID09PSB1bmRlZmluZWQpIHJldHVyblxuXG4gICAgc29sdmVzLnB1c2goe1xuICAgICAgY2F0ZWdvcnk6IGNoYWxsLmNhdGVnb3J5LFxuICAgICAgbmFtZTogY2hhbGwubmFtZSxcbiAgICAgIHBvaW50czogY2hhbGxlbmdlSW5mb1tpXS5zY29yZSxcbiAgICAgIHNvbHZlczogY2hhbGxlbmdlSW5mb1tpXS5zb2x2ZXMsXG4gICAgICBpZDogY2hhbGwuaWQsXG4gICAgICBjcmVhdGVkQXQ6IHNvbHZlLmNyZWF0ZWRhdC52YWx1ZU9mKClcbiAgICB9KVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogdXNlci5uYW1lLFxuICAgIGN0ZnRpbWVJZDogdXNlci5jdGZ0aW1lX2lkLFxuICAgIGRpdmlzaW9uOiB1c2VyLmRpdmlzaW9uLFxuICAgIHNjb3JlOiBzY29yZS5zY29yZSxcbiAgICBnbG9iYWxQbGFjZTogc2NvcmUuZ2xvYmFsUGxhY2UsXG4gICAgZGl2aXNpb25QbGFjZTogc2NvcmUuZGl2aXNpb25QbGFjZSxcbiAgICBzb2x2ZXMsXG4gICAgaXRlbXM6IGF3YWl0IGRiLnN0b3JlLmdldEl0ZW1JZHNCeVVzZXJJZCh7IHVzZXJpZDogdXNlci5pZCB9KSxcbiAgICBlcXVpcHBlZEl0ZW1zOiBhd2FpdCBkYi5zdG9yZS5nZXRFcXVpcHBlZEl0ZW1zKHsgdXNlcmlkOiB1c2VyLmlkIH0pLFxuICAgIGNoaXBzOiB1c2VyLmNoaXBzLFxuICB9XG59XG4iXX0=