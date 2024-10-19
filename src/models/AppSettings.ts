import { getQueryParams } from "../../temp/core/util/getQueryParams";
import { DemoMode, parseDemoMode } from "./DemoMode";
import { ThemeName } from "./ThemeName";

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

        this.theme = params.theme ?? ThemeName.dark;
    }

}
