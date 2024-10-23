import { ComponentAnimation } from "../app/App.base";
import { QuizTitleConfig } from "./QuizTitle.config";

export function createAnimation(config: QuizTitleConfig): QuizTitleAnimation {
    /////////////////////
    return new QuizTitleAnimation(config);
}

class QuizTitleAnimation ////////////////////
    extends ComponentAnimation<QuizTitleConfig>
{
    ///
    public constructor(config: QuizTitleConfig) {
        super(config);
    }

    public async transitionIn(): Promise<void> {
        await this._fade[1].instance.run();
    }
}
