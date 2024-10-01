import { EASING } from "./easings";

let _config: GlobalAnimationConfig | null = null;

export function useGlobalAnimationConfig(config: GlobalAnimationConfig): void {
    if (_config) {
        return;
    }
    config.speed ??= 142;
    config.fadeDuration ??= 300;
    config.fadeEasing ??= EASING.linear;
    config.maxOpacity ??= 1;
    config.minOpacity ??= 0;
    config.scaleDuration ??= 900;
    config.scaleEasing ??= EASING.linear;
    _config = config;
}

export interface GlobalAnimationConfig {
    speed?: number;
    fadeDuration?: number;
    fadeEasing?: string;
    maxOpacity?: number;
    minOpacity?: number;
    scaleDuration?: number;
    scaleEasing?: string;
}

export function getGlobalAnimationConfig(): GlobalAnimationConfig {
    if (!_config) {
        throw new Error("Global animation config not set");
    }
    return _config;
}
