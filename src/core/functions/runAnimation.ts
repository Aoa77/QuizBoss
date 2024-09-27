import anime, { AnimeParams } from "animejs";
import { AnimationFactory } from "../xobjs/AnimationFactory";

export function runAnimation(
    params: AnimeParams,
    localSpeed: number = 1,
    logger: ((x: unknown) => void) | null = null,
): Promise<void> {
    if (typeof params.duration === "number") {
        params.duration /= AnimationFactory.instance.speedMultiplier;
        params.duration /= localSpeed;
    }
    return new Promise((resolve) => {
        const begin = () => {
            if (logger) {
                logger({ params, localSpeed });
            }
        };
        const complete = () => resolve();
        anime({ ...params, begin, complete });
    });
}
