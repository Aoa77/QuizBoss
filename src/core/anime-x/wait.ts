import { getGlobalSpeed } from "./hooks";
import { applyTimePercentage } from "./percentages";

export function wait(duration: number, speed: number = 100): Promise<void> {
    duration = applyTimePercentage(duration, speed);
    duration = applyTimePercentage(duration, getGlobalSpeed());
    return new Promise((resolve) => setTimeout(resolve, duration));
}
