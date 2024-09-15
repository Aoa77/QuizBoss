import anime from "animejs";
import { delayCalc, Duration, Multiplier } from ".";

export default function animate(
    params: anime.AnimeParams,
    duration: Duration,
    multiplier: Multiplier = Multiplier.x1
): Promise<void> {
    params.duration = delayCalc(duration, multiplier);
    anime(params);
    return new Promise((resolve) => setTimeout(resolve, +params.duration!));
}
