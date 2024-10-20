import anime from "animejs";
import { AnimeInstance, AnimeParams } from "animejs";
import { Lazy } from "../csharp-sim/Lazy";

export class AnimationTask {
    ///
    public static createById(
        id: string,
        params: AnimeParams,
    ): Lazy<AnimationTask> {
        return AnimationTask.createByTarget(`#${id}`, params);
    }

    public static createByTarget(
        target: string,
        params: AnimeParams,
    ): Lazy<AnimationTask> {
        return new Lazy(
            () =>
                new AnimationTask({
                    ...params,
                    targets: target,
                    autoplay: false,
                }),
        );
    }

    private readonly _instance: AnimeInstance;
    private constructor(params: AnimeParams) {
        this._instance = anime(params);
    }

    play(): void {
        this._instance.play();
    }

    pause(): void {
        this._instance.pause();
    }

    public restart(): Promise<void> {
        return new Promise((resolve) => {
            this._instance.finished.then(() => {
                resolve();
            });
            this._instance.restart();
        });
    }

    public start(): Promise<void> {
        return new Promise((resolve) => {
            this._instance.finished.then(() => {
                resolve();
            });
            this.play();
        });
    }
}


