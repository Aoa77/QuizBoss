import { ComponentAnimation } from "../app/App.base";
import { Ease, Fade, Scale } from "../libs/anime+/enums";
import { QuestionImageConfig } from "./QuestionImage.config";

export function createAnimation(
    config: QuestionImageConfig,
): QuestionImageAnimation {
    return new QuestionImageAnimation(config);
}

class QuestionImageAnimation //////////////////////
    extends ComponentAnimation<QuestionImageConfig>
{
    ///
    public constructor(config: QuestionImageConfig) {
        super(config);
        this.createScale({
            value: Scale.zero,
            delay: 0,
            duration: this._config.animationDuration!,
            endDelay: 0,
            easing: Ease.inOutBack,
        });
    }

    public async transitionIn(): Promise<void> {
        await this._fade[1].instance.run();
    }

    ///
    public async transitionOut(): Promise<void> {
        await this._scale[0].instance.run();
        this.setOpacity(Fade.min);
        this.setScale(Scale.one);
    }
}
