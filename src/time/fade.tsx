import animate from "./animate";
import { Duration } from "./Duration";
import { Multiplier } from "./Multiplier";

export default async function fade(
    targets: string,
    opacity: number,
    multiplier: Multiplier = Multiplier.x1,
) {
    const easing = "linear";
    await animate({ targets, opacity, easing }, Duration.FADE, multiplier);
}