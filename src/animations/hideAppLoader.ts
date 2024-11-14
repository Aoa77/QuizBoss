import anime from "animejs";
import { AnimeTask } from "../libs/anime-context/AnimeTask";
import { $time, $ease } from "../libs/anime-context/constants";
import { Anim } from ".";

export async function hideAppLoader(): Promise<void> {
    ///
    Anim.AppTitle.immediate({ opacity: 1, scale: 1 });
    Anim.AppVersion.immediate({ opacity: 0.42, scale: 1 });
    Anim.LoadingSpinner.immediate({ opacity: 0, scale: 1 });

    ///
    await AnimeTask.run(
        anime({
            targets: "#app-loader",
            opacity: [1, 0],
            delay: $time.ticks(2),
            duration: $time.ticks(4),
            endDelay: $time.ticks(8),
            easing: $ease.linear,
        }),
    );

    ///
    const el = document.getElementById("app-loader")!;
    el.style.display = "none";
}
