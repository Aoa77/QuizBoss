import { HttpUtility } from "../libs/friendlies/HttpUtility";
import { DemoMode, parseDemoMode } from "../models/DemoMode";
import { ThemeName } from "../models/Theme";

export class AppSettings {
    public readonly quizModuleName: string;
    public readonly demoMode: DemoMode;
    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;
    public readonly theme: ThemeName;
    public readonly errorHandler?: (error: unknown) => void;

    constructor(params: {
        quizModuleName?: string;
        demoMode?: DemoMode;
        guessButtonCount?: number;
        maxQuestions?: number;
        theme?: ThemeName;
        errorHandler?: (error: unknown) => void;
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
        this.errorHandler = params.errorHandler;
    }

}




