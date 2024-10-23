import anime from "animejs";
import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/enums";
import { Lazy } from "../libs/friendlies/Lazy";
import { LoadingSpinnerConfig } from "./LoadingSpinner.config";
import { ComponentAnimation } from "../app/App.base";

export function createAnimation(
    config: LoadingSpinnerConfig,
): LoadingSpinnerAnimation {
    return new LoadingSpinnerAnimation(config);
}

class LoadingSpinnerAnimation ///////////////////////
    extends ComponentAnimation<LoadingSpinnerConfig>
{
    ///
    private readonly _loop: Lazy<AnimationTask>;
    private _loopStarted = false;

    ///
    public constructor(config: LoadingSpinnerConfig) {
        ///
        super(config);

        ///
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
        if (!this._loopStarted) {
            this._loop.instance.run();
            this._loopStarted = true;
        }
        await this._fade[1].instance.run();
    }

    ///
    public async transitionOut(): Promise<void> {
        await this._fade[0].instance.run();
    }
}
