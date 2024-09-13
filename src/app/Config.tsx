import ConfigParams from "./ConfigParams";
import { DemoMode } from "../enums";
import { getUrlQueryParams } from "../utilities";

export default class Config {
    public readonly quizModuleName: string;
    public readonly demoMode: DemoMode;
    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;

    constructor(params: ConfigParams) {
        const qp = getUrlQueryParams(window.location.search);
        let {
            quizModuleName, /////////
            demoMode,
            guessButtonCount,
            maxQuestions,
        } = params;

        quizModuleName ??= qp.get("quizModuleName");
        if (!quizModuleName) {
            throw new Error("quizModuleName is required.");
        }
        this.quizModuleName = quizModuleName;

        demoMode ??= qp.get("demoMode") as DemoMode;
        this.demoMode = demoMode ?? DemoMode.OFF;

        this.guessButtonCount =
            guessButtonCount ?? +(qp.get("guessButtonCount") ?? "4");
        this.maxQuestions = maxQuestions ?? +(qp.get("maxQuestions") ?? "0");
    }
}
