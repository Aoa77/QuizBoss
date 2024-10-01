import { getGlobalAnimationConfig } from "./config";
import { applyTimePercentage } from "./percentages";

export function wait(duration: number, speed: number = 100): Promise<void> {
    const config = getGlobalAnimationConfig();
    duration = applyTimePercentage(duration, speed);
    duration = applyTimePercentage(duration, config.speed);
    return new Promise((resolve) => setTimeout(resolve, duration));
}
