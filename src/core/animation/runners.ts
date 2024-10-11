import anime, { AnimeParams } from "animejs";
import { applyTimePercentage } from "./percentages";
import { wait } from "./wait";

export function runAnimation(xp: AnimeParams): Promise<void> {
    ////
    if (typeof xp.duration === "number") {
        xp.duration = applyTimePercentage(xp.duration);
    }
    ////
    return anime(xp).finished;
}
