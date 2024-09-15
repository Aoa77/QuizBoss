import { ConfigParams, DemoMode, parseDemoMode } from ".";

export default class AppConfig {
    public readonly quizModuleName: string;
    public readonly demoMode: DemoMode;
    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;

    constructor(params: ConfigParams, queryParams: Map<string, string>) {
        let {
            quizModuleName, /////////
            demoMode,
            guessButtonCount,
            maxQuestions,
        } = params;

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
        this.maxQuestions = maxQuestions ?? +(queryParams.get("maxQuestions") ?? "0");

    }
}
