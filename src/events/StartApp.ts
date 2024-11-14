import { AppContext } from "../code/context";
import { EventName } from "../code/game";

export async function StartApp() {
    //
    const { flow } = AppContext.current(EventName.StartApp);

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
            eventName: EventName.LoadQuizModule,
        }));
    }
}
