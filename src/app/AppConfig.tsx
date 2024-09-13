import ConfigParams from "./ConfigParams";
import { DemoMode, demoModeFromString } from "./DemoMode";
import { getUrlQueryParams } from "../utilities";

export default class AppConfig {
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

        if (!demoMode) {
            demoMode = demoModeFromString(qp.get("demoMode"));
        }
        this.demoMode = demoMode;

        this.guessButtonCount =
            guessButtonCount ?? +(qp.get("guessButtonCount") ?? "4");
        this.maxQuestions = maxQuestions ?? +(qp.get("maxQuestions") ?? "0");

        console.info("AppConfig", this);
    }
}
