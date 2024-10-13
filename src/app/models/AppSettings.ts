import { getQueryParams } from "../../core/util/getQueryParams";
import { DemoMode } from "../constants/DemoMode";
import { DarkTheme, LightTheme, Theme } from "../styles/themes";

export class AppSettings {
    public readonly quizModuleName: string;
    public readonly demoMode: DemoMode;
    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;
    public readonly theme: Theme;

    constructor(params: {
        quizModuleName?: string;
        demoMode?: DemoMode;
        guessButtonCount?: number;
        maxQuestions?: number;
        theme?: Theme;
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

        this.theme = params.theme ?? DarkTheme;
        applyTheme(this.theme);
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

export function applyTheme(theme: Theme): void {
    for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(`--${key}`, value);
    }
}