import { AnimationFactory } from "../xobjs/AnimationFactory";

///
export function wait(duration: number, localSpeed: number = 1): Promise<void> {
    duration /= AnimationFactory.instance.speedMultiplier;
    duration /= localSpeed;
    return new Promise((resolve) => setTimeout(resolve, duration));
}
