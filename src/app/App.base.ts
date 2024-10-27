import { AnimationTask } from "../libs/anime+/AnimationTask";
import { TransformRegex } from "../libs/anime+/Constants";
import { AnimeParams } from "animejs";
import { AnimConfig } from "../models/AnimConfig";

export abstract class ComponentAnimation<TConfig extends AnimConfig, TKey> {
    protected readonly _config: TConfig;
    private readonly _anim: Map<TKey, (overrides: AnimeParams) => AnimationTask> =
        new Map();

    public constructor(config: TConfig) {
        ///
        this._config = config;
        this._config.id = this._config.id.trim();
        console.debug("config", this._config);
    }

    protected define(name: TKey, params: AnimeParams) {
        const anim = AnimationTask.idFactory(this._config.id, params);
        this._anim.set(name, anim);
    }

    protected defineChild(name: TKey, childSelector: string, params: AnimeParams) {
        const query = `#${this._config.id} ${childSelector.trim()}`;
        const anim = AnimationTask.queryFactory(query, params);
        this._anim.set(name, anim);
    }

    protected build(
        name: TKey,
        enable: boolean,
        overrides?: AnimeParams,
    ): AnimationTask | null {
        if (!enable) {
            return null;
        }
        const anim = this._anim.get(name);
        return anim ? anim(overrides ?? {}) : null;
    }

    protected getOpacity(): number | null {
        const el = this._config.ref.current as HTMLElement;
        const value = parseFloat(el?.style?.opacity ?? "-1");
        return value >= 0 ? value : null;
    }

    protected setOpacity(value: number) {
        const el = this._config.ref.current as HTMLElement;
        el.style.opacity = value.toString();
    }

    protected getScale(): number | null {
        const el = this._config.ref.current as HTMLElement;
        const transform = el?.style?.transform;
        const scale = transform?.match(TransformRegex.scale);
        if (!scale) {
            return null;
        }
        const value = parseFloat(scale?.[1] ?? "-1");
        return value >= 0 ? value : null;
    }

    protected setScale(value: number) {
        const el = this._config.ref.current as HTMLElement;
        el.style.transform = el.style.transform.replace(
            TransformRegex.scale,
            `scale(${value})`,
        );
    }
}

export interface AnimParams {
    delay: number;
    duration: number;
    enable: boolean;
}
