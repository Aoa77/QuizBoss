import { useAnimationFactory } from "../../core/hooks/useAnimationFactory";
import { animations } from "../elements/animations";
import { waitTimes } from "../elements/waitTimes";

export function useAnimation(speedMultiplier: number) {
    useAnimationFactory({
        speedMultiplier,
        animationBuilders: animations,
        waitTimes,
    });
}


