import { applyTimePercentage } from "../../functions/applyPercentage";
import { getGlobalSpeed } from "./globalSpeed";

export function wait(duration: number, speed: number = 100): Promise<void> {
    duration = applyTimePercentage(duration, speed);
    duration = applyTimePercentage(duration, getGlobalSpeed());
    return new Promise((resolve) => setTimeout(resolve, duration));
}
