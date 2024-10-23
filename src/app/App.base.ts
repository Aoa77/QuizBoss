import { CSSProperties, RefObject } from "react";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { TransitionParams } from "../libs/anime+/TransitionParams";
import { Lazy } from "../libs/friendlies/Lazy";
import { Ease, Fade } from "../libs/anime+/enums";

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
    protected readonly _fade: Lazy<AnimationTask>[] = [];
    protected readonly _scale: Lazy<AnimationTask>[] = [];
    protected readonly _transformRegex;

    public constructor(config: T) {
        ///
        this._config = config;
        console.debug("config", this._config);

        ///
        this._transformRegex = /scale\((\d+(\.\d+)?)\)/;

        ///
        const fadeParams = {
            delay: 0,
            duration: this._config.animationDuration!,
            endDelay: 0,
            easing: Ease.linear,
        };
        this.createFade({
            ...fadeParams,
            value: [Fade.max, Fade.min],
        });
        this.createFade({
            ...fadeParams,
            value: [Fade.min, Fade.max],
        });
    }

    public createFade(params: TransitionParams<number>) {
        const anim = AnimationTask.createById(this._config.animationId!, {
            opacity: params.value,
            delay: params.delay,
            duration: params.duration,
            endDelay: params.endDelay,
            easing: params.easing,
        });
        this._fade.push(anim);
    }

    public createScale(params: TransitionParams<number>) {
        const anim = AnimationTask.createById(this._config.animationId!, {
            scale: params.value,
            delay: params.delay,
            duration: params.duration,
            endDelay: params.endDelay,
            easing: params.easing,
        });
        this._scale.push(anim);
    }

    public getOpacity(): number | null {
        const el = this._config.ref.current as HTMLElement;
        const value = parseFloat(el?.style?.opacity ?? "-1");
        return value >= 0 ? value : null;
    }

    public setOpacity(value: number) {
        const el = this._config.ref.current as HTMLElement;
        el.style.opacity = value.toString();
    }

    public getScale(): number | null {
        const el = this._config.ref.current as HTMLElement;
        const transform = el?.style?.transform;
        const scale = transform?.match(this._transformRegex);
        if (!scale) {
            return null;
        }
        const value = parseFloat(scale?.[1] ?? "-1");
        return value >= 0 ? value : null;
    }

    public setScale(value: number) {
        const el = this._config.ref.current as HTMLElement;
        el.style.transform = el.style.transform.replace(
            this._transformRegex,
            `scale(${value})`,
        );
    }
}
