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

    private constructor(params: AnimeParams) {
        this._instance = anime(params);
    }

    play(): void {
        this._instance.play();
    }

    pause(): void {
        this._instance.pause();
    }

    // public restart(): Promise<void> {
    //     return new Promise((resolve) => {
    //         this._instance.finished.then(() => {
    //             resolve();
    //         });
    //         this._instance.restart();
    //     });
    // }

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
