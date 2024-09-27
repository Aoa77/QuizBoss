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
}
