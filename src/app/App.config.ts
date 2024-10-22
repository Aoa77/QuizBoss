import { CSSProperties, RefObject } from "react";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Lazy } from "../libs/friendlies/Lazy";
import { Ease } from "../libs/anime+/Ease";

export interface ComponentConfig {
    ///
    ref: RefObject<HTMLElement>;
    ///
    animationId?: string;
    animationDuration?: number;
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
            opacity: 1,
            duration: config.animationDuration,
            easing: Ease.linear,
        });

        this._fadeOut = AnimationTask.createById(config.animationId!, {
            opacity: 0,
            duration: config.animationDuration,
            easing: Ease.linear,
        });
    }

    public get fadeIn(): AnimationTask {
        return this._fadeIn.instance;
    }

    public get fadeOut(): AnimationTask {
        return this._fadeOut.instance;
    }

    public fadeTo(params: {
        value: number;
        duration?: number;
    }): Lazy<AnimationTask> {
        return AnimationTask.createById(this._config.animationId!, {
            opacity: [this.opacity, params.value],
            duration: params.duration ?? this._config.animationDuration,
            easing: Ease.linear,
        });
    }

    public get opacity(): number {
        const el = this._config.ref.current as HTMLElement;
        const value = parseFloat(el?.style?.opacity ?? "0");
        return value;
    }

    public set opacity(value: number) {
        const el = this._config.ref.current as HTMLElement;
        el.style.opacity = value.toString();
    }

    public scaleTo(params: {
        value: number;
        duration?: number;
        easing?: string;
    }): Lazy<AnimationTask> {
        return AnimationTask.createById(this._config.animationId!, {
            scale: params.value,
            duration: params.duration ?? this._config.animationDuration,
            easing: params.easing ?? Ease.inOutBack,
        });
    }

    public set scale(value: number) {
        this.scaleTo({ value, duration: 0, easing: Ease.linear }).instance.play();
    }
}
