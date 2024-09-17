import ConfigParams from "./ConfigParams";
import { DemoMode } from "./DemoMode";
import parseDemoMode from "./parseDemoMode";

export default class AppSettings {
    public readonly quizModuleName: string;
    public readonly demoMode: DemoMode;
    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;
    public readonly speed: number;

    constructor(params: ConfigParams, queryParams: Map<string, string>) {
        let { quizModuleName, demoMode } = params;
        const { guessButtonCount, maxQuestions, speed } = params;

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

    private static instance?: AppSettings;

    public static getInstance(): AppSettings {
        if (!this.instance) {
            throw new Error("AppSettings instance not set.");
        }
        return this.instance;
    }

    public static setInstance(settings: AppSettings): void {
        if (this.instance) {
            throw new Error("AppSettings instance already set.");
        }
        this.instance = settings;
    }
}
