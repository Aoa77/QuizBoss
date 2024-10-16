import anime, { AnimeInstance, AnimeParams } from "animejs";
import { applyTimePercentage } from "./percentages";

export function createAnimation(xp: AnimeParams): AnimeInstance {
    ////
    if (typeof xp.duration === "number") {
        xp.duration = applyTimePercentage(xp.duration);
    }
    ////
    return anime(xp);
}

export function runAnimation(xp: AnimeParams): Promise<void> {
    return createAnimation(xp).finished;
}
