import { AnimationDefaultSettings } from "./config";
import { applyTimePercentage } from "./percentages";

export function wait(
    duration: number = AnimationDefaultSettings.config.waitDuration,
): Promise<void> {
    duration = applyTimePercentage(duration);
    return new Promise((resolve) => setTimeout(resolve, duration));
}
