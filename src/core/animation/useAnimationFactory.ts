
//////////

import { AnimationFactory } from "./AnimationFactory";
import { AnimationFactoryParams } from "./AnimationFactoryParams";
import { setSpeedMultiplier } from "./getSpeedMultiplier";

//
export let _initialized: boolean = false;

export function useAnimationFactory(params: AnimationFactoryParams): void {
    if (_initialized) {
        return;
    }
    _initialized = true;
    setSpeedMultiplier(params.speedMultiplier);
    
    params.animationBuilders.forEach((builder) => {
        console.debug(`Registering animation builder: ${builder.name}`);
        if (AnimationFactory.instance.builders.has(builder.name)) {
            throw new Error(
                `Animation factory builder already exists: ${builder.name}`,
            );
        }
        AnimationFactory.instance.builders.set(builder.name, builder);
    });

    params.waitTimes.forEach((wait) => {
        console.debug(`Registering wait time: ${wait.name}`);
        if (AnimationFactory.instance.waitTimes.has(wait.name)) {
            throw new Error(`Wait time already exists: ${wait.name}`);
        }
        AnimationFactory.instance.waitTimes.set(wait.name, wait);
    });
}

