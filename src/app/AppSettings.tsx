import ConfigParams from "./ConfigParams";
import { DemoMode } from "./DemoMode";
import getQueryParams from "../functions/getQueryParams";
import parseDemoMode from "./parseDemoMode";

export default class AppSettings {
    public readonly quizModuleName: string;
    public readonly demoMode: DemoMode;
    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;
    public readonly speed: number;

    constructor(params: ConfigParams) {
        let { quizModuleName, demoMode } = params;
        const { guessButtonCount, maxQuestions, speed } = params;
        const queryParams = getQueryParams(window.location.search);

        quizModuleName ??= queryParams.get("quizModuleName");
        if (!quizModuleName) {
            throw new Error("quizModuleName is required.");
        }
        this.quizModuleName = quizModuleName;

        if (!demoMode) {
            demoMode = parseDemoMode(queryParams.get("demoMode"));
        }
        this.demoMode = demoMode;

        this.guessButtonCount =
            guessButtonCount ?? +(queryParams.get("guessButtonCount") ?? "4");

        this.maxQuestions =
            maxQuestions ?? +(queryParams.get("maxQuestions") ?? "0");

        this.speed = speed ?? +(queryParams.get("speed") ?? "1"); ////
    }

}
