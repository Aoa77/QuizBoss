import anime from "animejs";
import { Duration } from "./Duration";
import durationCalc from "./durationCalc";


export default function animate(
    params: anime.AnimeParams,
    duration: Duration,
): Promise<void> {
    params.duration = durationCalc(duration);
    anime(params);
    return new Promise((resolve) => setTimeout(resolve, +params.duration!));
}