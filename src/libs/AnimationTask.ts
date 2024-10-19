import anime from "animejs";
import { AnimeInstance, AnimeParams } from "animejs";
import { Lazy } from "./Lazy";

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

export const EASING = {
    linear: "linear",
    easeInBack: "easeInBack",
    easeInBounce: "easeInBounce",
    easeInCirc: "easeInCirc",
    easeInCubic: "easeInCubic",
    easeInExpo: "easeInExpo",
    easeInOutBack: "easeInOutBack",
    easeInOutBounce: "easeInOutBounce",
    easeInOutCirc: "easeInOutCirc",
    easeInOutCubic: "easeInOutCubic",
    easeInOutExpo: "easeInOutExpo",
    easeInOutQuad: "easeInOutQuad",
    easeInOutQuart: "easeInOutQuart",
    easeInOutQuint: "easeInOutQuint",
    easeInOutSine: "easeInOutSine",
    easeInQuad: "easeInQuad",
    easeInQuart: "easeInQuart",
    easeInQuint: "easeInQuint",
    easeInSine: "easeInSine",
    easeOutBack: "easeOutBack",
    easeOutBounce: "easeOutBounce",
    easeOutCirc: "easeOutCirc",
    easeOutCubic: "easeOutCubic",
    easeOutExpo: "easeOutExpo",
    easeOutInBack: "easeOutInBack",
    easeOutInBounce: "easeOutInBounce",
    easeOutInCirc: "easeOutInCirc",
    easeOutInCubic: "easeOutInCubic",
    easeOutInExpo: "easeOutInExpo",
    easeOutInQuad: "easeOutInQuad",
    easeOutInQuart: "easeOutInQuart",
    easeOutInQuint: "easeOutInQuint",
    easeOutInSine: "easeOutInSine",
    easeOutQuad: "easeOutQuad",
    easeOutQuart: "easeOutQuart",
    easeOutQuint: "easeOutQuint",
    easeOutSine: "easeOutSine",
};
