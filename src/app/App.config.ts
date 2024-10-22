import { CSSProperties } from "react";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Lazy } from "../libs/csharp-sim/Lazy";
import { Ease } from "../libs/anime+/Ease";

export interface ComponentConfig {
    animationId?: string;
    fadeDuration?: number;
    sectionHeight?: number;
    sectionMarginTop?: number;
    sectionStyle?: CSSProperties;
}

export abstract class ComponentAnimation<T extends ComponentConfig> {
    protected readonly _config: T;
    private readonly _fadeIn: Lazy<AnimationTask>;
    private readonly _fadeOut: Lazy<AnimationTask>;

    public constructor(config: T) {
        this._config = config;
        console.debug("config", this._config);

        this._fadeIn = AnimationTask.createById(config.animationId!, {
            opacity: [0, 1],
            duration: config.fadeDuration,
            easing: Ease.linear,
        });

        this._fadeOut = AnimationTask.createById(config.animationId!, {
            opacity: [1, 0],
            duration: config.fadeDuration,
            easing: Ease.linear,
        });
    }

    public get fadeIn(): AnimationTask {
        return this._fadeIn.value;
    }

    public get fadeOut(): AnimationTask {
        return this._fadeOut.value;
    }
}
