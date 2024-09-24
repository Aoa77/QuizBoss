import { AnimationFactory } from "./AnimationFactory";
import { WaitTime } from "./WaitTime";

export function getWaitTime(name: string): WaitTime {
    const waitTime = AnimationFactory.instance.waitTimes.get(name);
    if (!waitTime) {
        throw new Error(`Wait time not found: ${name}`);
    }
    return waitTime;
}
