import { DemoMode } from "./DemoMode";

export default interface ConfigParams {
    quizModuleName?: string;
    demoMode?: DemoMode;
    guessButtonCount?: number;
    maxQuestions?: number;
}
