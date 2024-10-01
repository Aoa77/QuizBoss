import { useGlobalAnimation } from "../../core/anime-x/hooks";

export function useAnimation(speed: number) {
    useGlobalAnimation(speed);
}
