import { AnimationFactory } from "../xobjs/AnimationFactory";
import { getWaitTime } from "./getWaitTime";

///
export function wait(name: string): Promise<void> {
    const waitTime = getWaitTime(name);
    const duration =
        waitTime.duration / AnimationFactory.instance.speedMultiplier;
    return new Promise((resolve) => setTimeout(resolve, duration));
}
