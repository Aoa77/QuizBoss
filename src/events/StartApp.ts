import { AppContext } from "../app/context";
import { Anim } from "../code/animation";
import { EventName } from "../code/game";

export async function StartApp() {
    //
    const { flow } = AppContext.current(EventName.StartApp);

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
        return appVersion;
    }

    //
    let appVersion = "";
    try {
        initVisibleSections();
        appVersion = await fetchAppVersion();
    } finally {
        flow.dispatch((state) => ({
            ...state,
            appVersion,
            eventName: EventName.LoadQuizModule,
        }));
    }
}
