import animate from "./animate";
import delay from "./delay";
import { Duration } from "./Duration";
import { Multiplier } from "./Multiplier";

export async function scale(
    targets: string,
    scale: number,
    multiplier: Multiplier = Multiplier.x1
) {
    await animate({ targets, scale }, Duration.SCALE, multiplier);

    document.querySelector(targets)!.style.transform = `scale(${scale + 0.1})`;
    await delay(Duration.SCALE, multiplier);
}
