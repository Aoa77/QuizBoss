import anime, { AnimeParams } from "animejs";
import delayCalc from "./delayCalc";
import { Duration } from "./Duration";
import { Multiplier } from "./Multiplier";

export default function animate(
    params: AnimeParams,
    duration: Duration | number,
    multiplier: Multiplier | number = Multiplier.x1,
): Promise<void> {
    params.duration = delayCalc(duration, multiplier);
    return new Promise((resolve) => {
        params.complete = () => {
            resolve();
        };
        anime(params);
    });
}
