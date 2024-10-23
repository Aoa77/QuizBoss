import anime from "animejs";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease, Fade } from "../libs/anime+/enums";
import { Lazy } from "../libs/friendlies/Lazy";
import { LoadingSpinnerConfig } from "./LoadingSpinner.config";
import { ComponentAnimation } from "../app/App.config";
import { LoadingProgress } from "./LoadingProgress";

export function createAnimation(
    config: LoadingSpinnerConfig,
): LoadingSpinnerAnimation {
    return new LoadingSpinnerAnimation(config);
}

export class LoadingSpinnerAnimation ///////////////////////
    extends ComponentAnimation<LoadingSpinnerConfig>
{
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
    public async transitionIn(): Promise<void> {
        const group = [];

        if (!this._loopStarted) {
            this._loop.instance.run();
            this._loopStarted = true;

            group.push(
                LoadingProgress.animation.fade({
                    value: Fade.max,
                    delay: this._config.delayBeforeProgressBar!,
                    duration: this._config.animationDuration!,
                    endDelay: 0,
                    easing: Ease.linear,
                }).instance,
            );
        }

        await this.fade({
            value: Fade.max,
            delay: 0,
            duration: this._config.animationDuration!,
            endDelay: 0,
            easing: Ease.linear,
        })
            .instance.runWithGroup(group)
            .all();
    }

    ///
    public async transitionOut(): Promise<void> {
        const group = [];

        if (LoadingProgress.animation.opacity > 0) {
            group.push(
                LoadingProgress.animation.fade({
                    value: Fade.min,
                    delay: 0,
                    duration: this._config.animationDuration!,
                    endDelay: 0,
                    easing: Ease.linear,
                }).instance,
            );
        }

        await this.fade({
            value: Fade.min,
            delay: 0,
            duration: this._config.animationDuration!,
            endDelay: 0,
            easing: Ease.linear,
        })
            .instance.runWithGroup(group)
            .all();
    }
}
