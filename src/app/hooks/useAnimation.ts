import { useGlobalAnimation } from "../../core/animation/hooks";

export function useAnimation(speed: number) {
    useGlobalAnimation(speed);
}
