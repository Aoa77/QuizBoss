// import { PERCENT_100 } from "./constants";

export function applyTimePercentage(value: number): number {
    if (value <= 0) {
        return 1;
    }
    return value;
    // if (AnimationGlobalSettings.config.speed === PERCENT_100) {
    //     return value;
    // }
    // return value / (AnimationGlobalSettings.config.speed / PERCENT_100);
}
