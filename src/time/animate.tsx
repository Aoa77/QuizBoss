import anime, { AnimeParams } from "animejs";
import delayCalc from "./delayCalc";
import { Duration } from "./Duration";
import { Multiplier } from "./Multiplier";

export default function animate(
    params: AnimeParams,
    duration: Duration,
    multiplier: Multiplier = Multiplier.x1,
): Promise<void> {
    return new Promise((resolve) => {
        params.duration = delayCalc(duration, multiplier);
        params.complete = () => {
            resolve();
        };
        anime(params);
    });
}
