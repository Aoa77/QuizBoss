import { AnimeRef, $time, $ease } from "../../libs/anime-context";

export async function concludeButtonReveal(params: {
    buttonRef: AnimeRef;
    delayTicks: number;
}): Promise<void> {
    await params.buttonRef.run({
        scale: [1.3, 1.0],
        delay: $time.ticks(params.delayTicks),
        duration: $time.ticks(1),
        easing: $ease.out.elastic(3, 1),
    });
}
