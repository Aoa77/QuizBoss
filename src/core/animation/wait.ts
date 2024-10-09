import { applyTimePercentage } from "./percentages";

export function wait(duration: number): Promise<void> {
    duration = applyTimePercentage(duration);
    return new Promise((resolve) => setTimeout(resolve, duration));
}
