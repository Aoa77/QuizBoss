import anime, { AnimeParams } from "animejs";
import { AnimationFactory } from "../xobjs/AnimationFactory";

export function runAnimation(params: AnimeParams): Promise<void> {
    if (typeof params.duration === "number") {
        params.duration *= AnimationFactory.instance.speedMultiplier;
    }
    return new Promise((resolve) => {
        const complete = () => resolve();
        anime({ ...params, complete });
    });
}
