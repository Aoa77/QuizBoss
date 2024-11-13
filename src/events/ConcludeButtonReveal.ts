import { AnimeRef } from "../libs/anime-context";
import { $time, $ease } from "../libs/anime-context/constants";

export async function ConcludeButtonReveal(buttonRef: AnimeRef, delay: number) {
    await buttonRef.run({
        scale: [1.3, 1.0],
        delay: $time.ticks(delay),
        duration: $time.ticks(1),
        easing: $ease.out.elastic(3, 1),
    });
}
