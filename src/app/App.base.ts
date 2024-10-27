import { AnimationTask } from "../libs/anime+/AnimationTask";
import { TransformRegex } from "../libs/anime+/Constants";
import { AnimeParams } from "animejs";
import { AnimConfig } from "../models/AnimConfig";
import { createRef, RefObject } from "react";

export abstract class ComponentAnimation<TKey> implements AnimConfig {
    private readonly _anim: Map<TKey, (overrides: AnimeParams) => AnimationTask> =
        new Map();

    public constructor(id: string) {
        this.id = id.trim();
        this.ref = createRef();
    }

    public readonly id: string;
    public readonly ref: RefObject<HTMLElement>;

    protected define(name: TKey, params: AnimeParams) {
        const anim = AnimationTask.idFactory(this.id, params);
        this._anim.set(name, anim);
    }

    protected defineChild(name: TKey, childSelector: string, params: AnimeParams) {
        const query = `#${this.id} ${childSelector.trim()}`;
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
        const el = this.ref.current as HTMLElement;
        const value = parseFloat(el?.style?.opacity ?? "-1");
        return value >= 0 ? value : null;
    }

    protected setOpacity(value: number) {
        const el = this.ref.current as HTMLElement;
        el.style.opacity = value.toString();
    }

    protected getScale(): number | null {
        const el = this.ref.current as HTMLElement;
        const transform = el?.style?.transform;
        const scale = transform?.match(TransformRegex.scale);
        if (!scale) {
            return null;
        }
        const value = parseFloat(scale?.[1] ?? "-1");
        return value >= 0 ? value : null;
    }

    protected setScale(value: number) {
        const el = this.ref.current as HTMLElement;
        el.style.transform = el.style.transform.replace(
            TransformRegex.scale,
            `scale(${value})`,
        );
    }
}


