import anime from "animejs";
import { AnimationFactory } from "../xobjs/AnimationFactory";
import { AnimationFactoryParams } from "../xobjs/AnimationFactoryParams";

//
export let _initialized: boolean = false;

export function useAnimationFactory(params: AnimationFactoryParams): void {
    if (_initialized) {
        return;
    }
    _initialized = true;
    AnimationFactory.init(params.speedMultiplier);

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
