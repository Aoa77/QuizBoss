import { ComponentAnimation } from "../app/App.config";
import { Ease, Fade } from "../libs/anime+/enums";
import { QuizTitleConfig } from "./QuizTitle.config";

export class QuizTitleAnimation extends ComponentAnimation<QuizTitleConfig> {
    ///
    public constructor(config: QuizTitleConfig) {
        super(config);
    }

    public async transitionIn(): Promise<void> {
        await this.fade({
            value: Fade.max,
            delay: 0,
            duration: this._config.animationDuration!,
            endDelay: 0,
            easing: Ease.linear,
        }).instance.run();
    }
}
