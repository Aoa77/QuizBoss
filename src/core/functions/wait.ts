import { AnimationFactory } from "../xobjs/AnimationFactory";
import { getWaitTime } from "./getWaitTime";

///
export function wait(name: string, localSpeed: number = 1): Promise<void> {
    const waitTime = getWaitTime(name);
    let duration = waitTime.duration;
    duration /= AnimationFactory.instance.speedMultiplier;
    duration /= localSpeed;
    console.debug(`WAIT ${name}: ${duration}ms`);
    return new Promise((resolve) => setTimeout(resolve, duration));
}
