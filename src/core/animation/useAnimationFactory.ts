import { AnimationBuilder } from "./AnimeBuilder";
import { factory } from "./factory";

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
        if (factory.has(builder.name)) {
            throw new Error(
                `Animation factory builder already exists: ${builder.name}`,
            );
        }
        factory.set(builder.name, builder);
    });
}


