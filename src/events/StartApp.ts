import { AppContext } from "../app/context";
import { Anim } from "../code/animation";
import { EventName } from "../code/game";
import anime from "animejs";
import { AnimeTask } from "../libs/anime-context/AnimeTask";
import { $ease, $time } from "../libs/anime-context/constants";

export async function StartApp() {
    //
    const { flow } = AppContext.current(EventName.StartApp);

    //
    async function hideAppLoader(): Promise<void> {
        await AnimeTask.run(
            anime({
                targets: "#app-loader",
                opacity: [1, 0],
                delay: $time.ticks(16),
                duration: $time.ticks(4),
                endDelay: $time.ticks(160000),
                easing: $ease.linear,
            }),
        );
        const el = document.getElementById("app-loader")!;
        el.style.display = "none";
    }

    function initVisibleSections() {
        Anim.AppTitle.immediate({ opacity: 1, scale: 1 });
        Anim.AppVersion.immediate({ opacity: 0.5, scale: 1 });
        Anim.LoadingSpinner.immediate({ opacity: 0, scale: 1 });
    }

    async function fetchAppVersion() {
        const response = await fetch("version", {
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "text/plain",
                Accept: "text/plain",
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch version file.`);
        }
        const appVersion = await response.text();
        Anim.AppVersion.element!.innerText = appVersion;
        return appVersion;
    }

    //
    let appVersion = "";
    try {
        initVisibleSections();
        appVersion = await fetchAppVersion();
    } finally {
        await hideAppLoader();
    }

    flow.dispatch((state) => ({
        ...state,
        appVersion,
        eventName: EventName.LoadQuizModule,
    }));
}
