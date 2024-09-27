import { useAnimationFactory } from "../../core/hooks/useAnimationFactory";

export function useAnimation(speedMultiplier: number) {
    useAnimationFactory({
        speedMultiplier,
    });
}
