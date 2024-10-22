import anime from "animejs";
import { AnimeInstance, AnimeParams } from "animejs";
import { Lazy } from "../csharp-sim/Lazy";

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
        console.info("params", params);
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
        console.log("start");
        return new Promise((resolve) => {
            console.info("instance", this._instance);
            this._instance.finished.then(() => {
                console.log("finished");
                resolve();
            }).catch((e) => {
                console.error(e);
            });

            this.play();
        });
    }
}