import { DemoMode } from "../models/DemoMode";
import getQueryParams from "../functions/getQueryParams";

export default class AppSettings {
    public readonly quizModuleName: string;
    public readonly demoMode: DemoMode;
    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;
    public readonly speed: number;

    constructor(params: {
        quizModuleName?: string;
        demoMode?: DemoMode;
        guessButtonCount?: number;
        maxQuestions?: number;
        speed?: number;
    }) {
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
