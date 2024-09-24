import { AnimationFactory } from "./AnimationFactory";
import { AnimationBuilder } from "./AnimeBuilder";

//////////
///
let _speedMultiplier: number = 0;
let _initialized = false;

///
export function getSpeedMultiplier(): number {
    console.debug(`Speed multiplier: ${_speedMultiplier}`);
    if (_speedMultiplier <= 0) {
        throw new Error("Speed multiplier not set");
    }
    return _speedMultiplier;
}

export function useAnimationFactory(
    speedMultiplier: number,
    ...builders: AnimationBuilder[]
): void {
    if (_initialized) {
        return;
    }
    _initialized = true;
    _speedMultiplier = speedMultiplier;
    builders.forEach((builder) => {
        console.debug(`Registering animation builder: ${builder.name}`);
        if (AnimationFactory.instance.has(builder.name)) {
            throw new Error(
                `Animation factory builder already exists: ${builder.name}`,
            );
        }
        AnimationFactory.instance.set(builder.name, builder);
    });
}
