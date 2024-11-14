import { AppContext } from "../core/context";
import { AppEvent } from "../core/events";

export async function StartApp() {
    //
    const { flow } = AppContext.current(AppEvent.StartApp);

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
        appVersion = await fetchAppVersion();
    } finally {
        flow.dispatch((state) => ({
            ...state,
            appVersion,
            eventName: AppEvent.LoadQuizModule,
        }));
    }
}
