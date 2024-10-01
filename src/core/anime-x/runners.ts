import anime, { AnimeParams } from "animejs";
import { applyTimePercentage } from "./percentages";
import { getGlobalAnimationConfig } from "./config";

export function runAnimation(xp: AnimeParams): Promise<void> {
    ////
    if (typeof xp.duration === "number") {
        xp.duration = applyTimePercentage(
            xp.duration,
            getGlobalAnimationConfig().speed,
        );
    }
    ////
    const fin = anime(xp).finished;
    console.log({ fin });
    return fin;
}

export function runAnimationSync(xp: AnimeParams): void {
    if (typeof xp.duration === "number") {
        xp.duration = applyTimePercentage(
            xp.duration,
            getGlobalAnimationConfig().speed,
        );
    }
    anime(xp);
}
