import anime from "animejs";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/csharp-sim/Lazy";
import { Task } from "../libs/csharp-sim/Task";
import { LoadingSpinnerConfig } from "./LoadingSpinner.config";

export class LoadingSpinnerAnimation {
    ///
    private readonly _config: LoadingSpinnerConfig;
    private readonly _fadeIn: Lazy<AnimationTask>;
    private readonly _fadeOut: Lazy<AnimationTask>;
    private readonly _loop: Lazy<AnimationTask>;
    private _loopStarted = false;

    ///
    public constructor(config: LoadingSpinnerConfig) {
        
        this._config = config;
        console.debug("config", this._config);
        this._config.extraDelay = 0;//999999;

        this._fadeIn = AnimationTask.createById(config.animationId!, {
            opacity: [0, 1],
            delay: config.fadeDelay,
            duration: config.fadeDuration,
            easing: Ease.linear,
            endDelay: config.fadeEndDelay,
        });

        this._fadeOut = AnimationTask.createById(config.animationId!, {
            opacity: [1, 0],
            delay: config.fadeDelay,
            duration: config.fadeDuration,
            easing: Ease.linear,
        });

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

    ///
    public async begin(): Promise<void> {
        await this.fadeIn.start();
        console.info("3");
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
    private get fadeIn(): AnimationTask {
        return this._fadeIn.value;
    }

    ///
    private get fadeOut(): AnimationTask {
        return this._fadeOut.value;
    }

    ///
    private get loop(): AnimationTask {
        return this._loop.value;
    }
}