import { useGlobalAnimationConfig } from "../../core/anime-x/config";

export function useAnimationConfig(speed: number) {
    useGlobalAnimationConfig({ speed, fadeDuration: 300, scaleDuration: 900 });
}
