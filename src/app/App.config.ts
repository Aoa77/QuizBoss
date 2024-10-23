import { CSSProperties, RefObject } from "react";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { TransitionParams } from "../libs/anime+/TransitionParams";
import { Lazy } from "../libs/friendlies/Lazy";

export interface ComponentConfig {
    ///
    ref: RefObject<HTMLElement>;
    ///
    animationId?: string;
    animationDuration?: number;
    sectionStyle?: CSSProperties;
}

export abstract class ComponentAnimation<T extends ComponentConfig> {
    protected readonly _config: T;

    public constructor(config: T) {
        this._config = config;
        console.debug("config", this._config);
    }

    public fade(params: TransitionParams): Lazy<AnimationTask> {
        return AnimationTask.createById(this._config.animationId!, {
            opacity: [this.opacity, params.value],
            delay: params.delay,
            duration: params.duration,
            endDelay: params.endDelay,
            easing: params.easing,
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

    public scale(params: TransitionParams): Lazy<AnimationTask> {
        return AnimationTask.createById(this._config.animationId!, {
            scale: params.value,
            delay: params.delay,
            duration: params.duration,
            endDelay: params.endDelay,
            easing: params.easing,
        });
    }
}
