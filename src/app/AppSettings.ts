import { HttpUtility } from "../libs/csharp-sim/HttpUtility";
import { DemoMode, parseDemoMode } from "../models/DemoMode";
import { ThemeName } from "../models/Theme";

export class AppSettings {
    public readonly quizModuleName: string;
    public readonly demoMode: DemoMode;
    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;
    public readonly theme: ThemeName;

    constructor(params: {
        quizModuleName?: string;
        demoMode?: DemoMode;
        guessButtonCount?: number;
        maxQuestions?: number;
        theme?: ThemeName;
    }) {
        let { quizModuleName, demoMode } = params;
        const { guessButtonCount, maxQuestions } = params;
        const qp = HttpUtility.parseQueryString(window.location.search);

        quizModuleName ??= qp.get("quizModuleName");
        if (!quizModuleName) {
            throw new Error("quizModuleName is required.");
        }
        this.quizModuleName = quizModuleName;

        if (!demoMode) {
            demoMode = parseDemoMode(qp.get("demoMode"));
        }
        this.demoMode = demoMode;

        this.guessButtonCount =
            guessButtonCount ?? +(qp.get("guessButtonCount") ?? "4");

        this.maxQuestions =
            maxQuestions ?? +(qp.get("maxQuestions") ?? "0");

        this.theme = params.theme ?? ThemeName.dark;
    }

}
