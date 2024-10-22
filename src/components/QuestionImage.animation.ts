import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/friendlies/Lazy";
import { QuestionImageConfig } from "./QuestionImage.config";

export class QuestionImageAnimation {
    private readonly _config: QuestionImageConfig;
    private readonly _fadeIn: Lazy<AnimationTask>;
    private readonly _fadeReset: Lazy<AnimationTask>;
    private readonly _scaleOut: Lazy<AnimationTask>;
    private readonly _scaleReset: Lazy<AnimationTask>;

    ///
    public constructor(config: QuestionImageConfig) {
        this._config = config;
        console.debug("config", this._config);

        this._fadeIn = AnimationTask.createById(config.animationId!, {
            opacity: [0, 1],
            duration: config.fadeDuration,
            easing: Ease.linear,
        });

        this._fadeReset = AnimationTask.createById(config.animationId!, {
            opacity: [1, 0],
            duration: 0,
            easing: Ease.linear,
        });

        this._scaleOut = AnimationTask.createById(config.animationId!, {
            scale: [1, 0],
            duration: config.fadeDuration,
            easing: Ease.inOutBack,
        });

        this._scaleReset = AnimationTask.createById(config.animationId!, {
            scale: [0, 1],
            duration: 1,
            easing: Ease.linear,
        });
    }

    ///
    public get fadeIn(): AnimationTask {
        return this._fadeIn.value;
    }
    ///
    ///
    public async begin(): Promise<void> {
        await this.fadeIn.run();
    }

    ///
    public async end(): Promise<void> {
        await this.scaleOut.run();
        await this.fadeReset.run();
        await this.scaleReset.run();
    }

    ///
    private get fadeReset(): AnimationTask {
        return this._fadeReset.value;
    }

    ///
    private get scaleOut(): AnimationTask {
        return this._scaleOut.value;
    }

    ///
    private get scaleReset(): AnimationTask {
        return this._scaleReset.value;
    }
}
