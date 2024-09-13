import { DemoMode } from "../enums";

export default interface ConfigParams {
    quizModuleName?: string;
    demoMode?: DemoMode;
    guessButtonCount?: number;
    maxQuestions?: number;
}
