import anime, { AnimeParams } from "animejs";
import { AnimationFactory } from "../xobjs/AnimationFactory";

export function runAnimation(params: AnimeParams, localSpeed: number = 1): Promise<void> {
    if (typeof params.duration === "number") {
        params.duration /= AnimationFactory.instance.speedMultiplier;
        params.duration /= localSpeed;
    }
    return new Promise((resolve) => {
        const complete = () => resolve();
        anime({ ...params, complete });
    });
}
