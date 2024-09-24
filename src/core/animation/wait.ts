import { getWaitTime } from "./getWaitTime";
import { getSpeedMultiplier } from "./getSpeedMultiplier";

///
export function wait(name: string): Promise<void> {
    const waitTime = getWaitTime(name);
    console.info(`Wait time: ${name} - ${waitTime.duration}`);
    const duration = waitTime.duration * getSpeedMultiplier();
    return new Promise((resolve) => setTimeout(resolve, duration));
}


