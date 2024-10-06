import { getQueryParams } from "../functions/getQueryParams";
import { DemoMode } from "../models/DemoMode";

export class AppSettings {
    public readonly quizModuleName: string;
    public readonly demoMode: DemoMode;
    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;

    constructor(params: {
        quizModuleName?: string;
        demoMode?: DemoMode;
        guessButtonCount?: number;
        maxQuestions?: number;
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
    }
}

function parseDemoMode(value: string | undefined | null): DemoMode {
    if (!value) {
        return DemoMode.OFF;
    }
    switch (value.toUpperCase()) {
        case DemoMode.RANDOM:
            return DemoMode.RANDOM;
        case DemoMode.RIGHT:
            return DemoMode.RIGHT;
        case DemoMode.WRONG:
            return DemoMode.WRONG;
        default:
            return DemoMode.OFF;
    }
}
