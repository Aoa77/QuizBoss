import { AnimationFactory } from "./AnimationFactory";
import { AnimationBuilder } from "./AnimeBuilder";

//////////
///
let _speedMultiplier: number = 1;


///
export function getSpeedMultiplier(): number {
    return _speedMultiplier;
}


export function useAnimationFactory(
    speedMultiplier: number = 1,
    ...builders: AnimationBuilder[]
): void {
    _speedMultiplier = speedMultiplier
    builders.forEach((builder) => {
        if (AnimationFactory.instance.has(builder.name)) {
            throw new Error(
                `Animation factory builder already exists: ${builder.name}`,
            );
        }
        AnimationFactory.instance.set(builder.name, builder);
    });
}


