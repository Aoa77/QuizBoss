import anime from "animejs";
import { AnimeInstance, AnimeParams } from "animejs";
import { Lazy } from "../friendlies/Lazy";

export class AnimationTask {
    ///
    public static createById(
        id: string,
        params: AnimeParams,
    ): Lazy<AnimationTask> {
        return AnimationTask.createByQuery(`#${id}`, params);
    }

    public static createByQuery(
        query: string,
        params: AnimeParams,
    ): Lazy<AnimationTask> {
        return new Lazy(
            () =>
                new AnimationTask({
                    ...params,
                    targets: query,
                    autoplay: false,
                }),
        );
    }

    private readonly _instance: AnimeInstance;
    private readonly _params: AnimeParams;

    private constructor(params: AnimeParams) {
        this._instance = anime(params);
        this._params = params;
    }

    public getOriginalParams(): AnimeParams {
        return this._params;
    }

    public isCompleted(): boolean {
        return this._instance.completed;
    }

    public isPaused(): boolean {
        return this._instance.paused;
    }

    public isPlaying(): boolean {
        return (
            this._instance.began &&
            !this._instance.completed &&
            !this._instance.paused
        );
    }

    public pause(): void {
        this._instance.pause();
    }

    public play(): void {
        this._instance.play();
    }

    public run(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._instance.finished
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });

            this.play();
        });
    }
}
