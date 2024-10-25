import { AnimationTask } from "../libs/anime+/AnimationTask";
import { TransformRegex } from "../libs/anime+/Constants";
import { AnimeParams } from "animejs";
import { AnimConfig } from "../models/AnimConfig";

export abstract class ComponentAnimation<TConfig extends AnimConfig, TKey> {
    protected readonly _config: TConfig;
    private readonly _anim: Map<
        TKey,
        (overrides: AnimeParams) => AnimationTask
    > = new Map();

    public constructor(config: TConfig) {
        ///
        this._config = config;
        this._config.id = this._config.id.trim();
        console.debug("config", this._config);
    }

    public abstract in(): Promise<void>;
    public abstract out(): Promise<void>;

    protected create(name: TKey, params: AnimeParams) {
        const anim = AnimationTask.createById(this._config.id, params);
        this._anim.set(name, anim);
    }

    protected createChild(
        name: TKey,
        childSelector: string,
        params: AnimeParams,
    ) {
        const query = `#${this._config.id} ${childSelector.trim()}`;
        const anim = AnimationTask.createByQuery(query, params);
        this._anim.set(name, anim);
    }

    protected get(name: TKey, overrides?: AnimeParams): AnimationTask {
        return this._anim.get(name)!(overrides ?? {});
    }

    protected isCompleted(name: TKey): boolean {
        return this.get(name).isCompleted();
    }

    protected isPaused(name: TKey): boolean {
        return this.get(name).isPaused();
    }

    protected isPlaying(name: TKey): boolean {
        return this.get(name).isPlaying();
    }

    public play(name: TKey): void {
        this.get(name).play();
    }

    public pause(name: TKey): void {
        this.get(name).pause();
    }

    protected async run(name: TKey): Promise<void> {
        await this.get(name).run();
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
