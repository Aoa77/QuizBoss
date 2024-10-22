import { AnimationTask } from "../libs/anime+/AnimationTask";
import { Ease } from "../libs/anime+/Ease";
import { Lazy } from "../libs/csharp-sim/Lazy";
import { QuizTitleConfig } from "./QuizTitle.config";

export class QuizTitleAnimation {
    private readonly _config: QuizTitleConfig;
    private readonly _fadeIn: Lazy<AnimationTask>;

    ///
    public constructor(config: QuizTitleConfig) {
        this._config = config;
        console.debug("config", this._config);

        this._fadeIn = AnimationTask.createById(config.animationId!, {
            opacity: [0, 1],
            duration: config.fadeDuration,
            easing: Ease.linear,
        });
    }

    ///
    public get fadeIn(): AnimationTask {
        return this._fadeIn.value;
    }
}
