import { ComponentAnimation } from "../app/App.config";
import { Ease, Fade, Scale } from "../libs/anime+/enums";
import { QuestionImageConfig } from "./QuestionImage.config";

export function createAnimation(
    config: QuestionImageConfig,
): QuestionImageAnimation {
    return new QuestionImageAnimation(config);
}

export class QuestionImageAnimation //////////////////////
    extends ComponentAnimation<QuestionImageConfig>
{
    ///
    public constructor(config: QuestionImageConfig) {
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

    ///
    public async transitionOut(): Promise<void> {
        await this.scale({
            value: Scale.zero,
            delay: 0,
            duration: this._config.animationDuration!,
            endDelay: 0,
            easing: Ease.inOutBack,
        }).instance.run();

        ///////////////////////
        this.opacity = 0;
        ///////////////////////

        await this.scale({
            value: Scale.one,
            duration: 0,
            delay: 0,
            endDelay: 0,
            easing: Ease.linear,
        }).instance.run();
    }
}
