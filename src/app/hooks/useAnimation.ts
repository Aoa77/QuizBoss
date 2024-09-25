import { useAnimationFactory } from "../../core/hooks/useAnimationFactory";
import { animationBuilders } from "../elements/animationBuilders";
import { waitTimes } from "../elements/waitTimes";

export function useAnimation(speedMultiplier: number) {
    useAnimationFactory({
        speedMultiplier,
        animationBuilders,
        waitTimes,
    });
}


