import anime, { AnimeParams } from "animejs";
import { getSpeedMultiplier } from "./useAnimationFactory";

/////////

export function runAnimation(params: AnimeParams): Promise<void> {
    if (typeof params.duration === "number") {
        params.duration *= getSpeedMultiplier();
    }
    return new Promise((resolve) => {
        const complete = () => resolve();
        anime({ ...params, complete });
    });
}
