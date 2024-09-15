import anime from "animejs";
import { delayCalc } from ".";

export default function animate(
    params: anime.AnimeParams,
    duration: number,
    multiplier: number = 1,
): Promise<void> {
    params.duration = delayCalc(duration, multiplier);
    anime(params);
    return new Promise((resolve) => setTimeout(resolve, +params.duration!));
}
