import { ComponentAnimation } from "../app/App.config";
import { QuizTitleConfig } from "./QuizTitle.config";

export class QuizTitleAnimation extends ComponentAnimation<QuizTitleConfig> {
    ///
    public constructor(config: QuizTitleConfig) {
        super(config);
    }
}
