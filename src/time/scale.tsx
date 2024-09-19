import animate from "./animate";
import { Duration } from "./Duration";
import { EaseDirection } from "./EaseDirection";
import { easeElastic } from "./easeElastic";
import ElasticEase from "./ElasticEase";
import { Multiplier } from "./Multiplier";

export async function scale(
    targets: string,
    scale: number,
    direction: EaseDirection,
    elastic?: ElasticEase | null,
    multiplier: Multiplier = Multiplier.x1
) {
    elastic ??= { direction, amplitude: 1, period: 0.5 };
    elastic.direction = direction;
    const easing = easeElastic(elastic);
    await animate({ targets, easing, scale }, Duration.SCALE, multiplier);
}
