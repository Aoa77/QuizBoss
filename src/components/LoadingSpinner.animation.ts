import anime from "animejs";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/friendlies/Lazy";
import { Task } from "../libs/friendlies/Task";
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
        if (!this._loopStarted) {
            this.loop.run();
            await Task.delay(this._config.delayBeforeProgressBar!);
            LoadingProgress.animation.fadeIn.run();
            this._loopStarted = true;
        } else {
            // reset??
        }
        await this.fadeIn.run();
    }

    ///
    public async end(): Promise<void> {
        await this.fadeOut.run();
    }

    ///
    private get loop(): AnimationTask {
        return this._loop.value;
    }
}