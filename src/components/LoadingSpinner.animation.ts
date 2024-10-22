import anime from "animejs";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/csharp-sim/Lazy";
import { Task } from "../libs/csharp-sim/Task";
import { LoadingSpinnerConfig } from "./LoadingSpinner.config";
import { ComponentAnimation } from "../app/App.config";
import { LoadingProgress } from "./LoadingProgress";

export class LoadingSpinnerAnimation extends ComponentAnimation<LoadingSpinnerConfig> {
    ///
    private readonly _loop: Lazy<AnimationTask>;
    private _loopStarted = false;

    ///
    public constructor(config: LoadingSpinnerConfig) {
        super(config);

        this._loop = AnimationTask.createByQuery(
            `section#${config.animationId} > svg > circle`,
            {
                r: config.radiusArray,
                loop: true,
                delay: anime.stagger(config.loopStagger!),
                duration: config.loopIteration,
                easing: Ease.linear,
            },
        );
    }

    ///
    public async begin(): Promise<void> {
        LoadingProgress.animation.fadeIn.start();
        await this.fadeIn.start();
        if (!this._loopStarted) {
            this._loopStarted = true;
            this.loop.start();
        } else {
            this.loop.restart();
        }
        await Task.delay(this._config.extraDelay!);
    }

    ///
    public async end(): Promise<void> {
        await this.fadeOut.start();
    }

    ///
    private get loop(): AnimationTask {
        return this._loop.value;
    }
}