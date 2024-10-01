import anime, { AnimeParams } from "animejs";
import { getGlobalSpeed } from "./hooks";
import { applyTimePercentage } from "./percentages";

export function runAnimation(xp: AnimeParams): Promise<void> {
    ////
    if (typeof xp.duration === "number") {
        xp.duration = applyTimePercentage(xp.duration, getGlobalSpeed());
    }
    ////
    const fin = anime(xp).finished;
    console.log({fin});
    return fin;
}

export function runAnimationSync(xp: AnimeParams): void {
    if (typeof xp.duration === "number") {
        xp.duration = applyTimePercentage(xp.duration, getGlobalSpeed());
    }
    anime(xp);
}
