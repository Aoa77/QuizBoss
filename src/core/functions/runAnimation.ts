import anime, { AnimeParams } from "animejs";
import { AnimationFactory } from "../xobjs/AnimationFactory";
import { AnimeAdjustments } from "../xobjs/AnimeAdjustments";
import { AsyncMode } from "../xobjs/AsyncMode";

export function runAnimation(
    params: AnimeParams,
    adjustments: AnimeAdjustments | null = null,
): Promise<void> {
    ////
    adjustments ??= {
        localSpeed: null,
        logger: null,
        mode: null,
    };
    adjustments.localSpeed ??= 1;
    adjustments.mode ??= AsyncMode.ASYNC;

    ////
    if (typeof params.duration === "number") {
        params.duration /= AnimationFactory.instance.speedMultiplier;
        params.duration /= adjustments.localSpeed;
    }

    ////
    return new Promise((resolve) => {
        if (adjustments.mode === AsyncMode.FIRE_AND_FORGET) {
            resolve();
        }
        const begin = () => {
            if (adjustments.logger) {
                adjustments.logger({ params, adjustments });
            }
        };
        const complete = () => resolve();
        anime({ ...params, begin, complete });
    });
}
