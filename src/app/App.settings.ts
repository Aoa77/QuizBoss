import { HttpUtility } from "../libs/friendlies/HttpUtility";
import { isBooleanNullOrUndefined } from "../libs/friendlies/BooleanBuddies";
import { parseBoolean } from "../libs/friendlies/BooleanBuddies";
import { DemoMode, parseDemoMode } from "../models/DemoMode";
import { parseThemeName, ThemeName } from "../models/Theme";
import { $time } from "../libs/anime-context/AnimeContext.constants";

export class AppSettings {
    public readonly quizModuleName: string;
    public readonly errorHandler?: (error: unknown) => void;

    public readonly enableSecretQuestionSkip: boolean;
    public readonly enableSecretWindowReload: boolean;
    public readonly demoMode: DemoMode;

    public readonly guessButtonCount: number;
    public readonly maxQuestions: number;
    public readonly preloadImageCount: number;
    public readonly theme: ThemeName;

    public readonly demoDelayMin: number;
    public readonly demoDelayMax: number;
    public readonly timerSeconds: number;
    public readonly pauseTimerBetweenQuestions: boolean;
    public readonly convertRemainingTimeToBonusPoints: boolean;
    public readonly forfeitQuestionOnTimeout: boolean;

    constructor(params: {
        quizModuleName?: string;
        errorHandler?: (error: unknown) => void;

        enableSecretQuestionSkip?: boolean;
        enableSecretWindowReload?: boolean;
        demoMode?: DemoMode;
        demoDelayMin?: number;
        demoDelayMax?: number;

        guessButtonCount?: number;
        maxQuestions?: number;
        preloadImageCount?: number;
        theme?: ThemeName;

        tickTime?: number;
        timerSeconds?: number;
        pauseTimerBetweenQuestions?: boolean;
        convertRemainingTimeToBonusPoints?: boolean;
        forfeitQuestionOnTimeout?: boolean;
    }) {
        ///
        let {
            quizModuleName,
            demoMode,
            theme,
            enableSecretQuestionSkip,
            enableSecretWindowReload,
            pauseTimerBetweenQuestions,
            convertRemainingTimeToBonusPoints,
            forfeitQuestionOnTimeout,
        } = params;

        ///
        const {
            demoDelayMin,
            demoDelayMax,
            errorHandler,
            guessButtonCount,
            maxQuestions,
            tickTime,
            preloadImageCount,
            timerSeconds,
        } = params;

        ///
        const qp = HttpUtility.parseQueryString(window.location.search);

        ///
        this.errorHandler = errorHandler;

        ///
        quizModuleName ??= qp.get("quizModuleName");
        if (!quizModuleName) {
            throw new Error("quizModuleName is required.");
        }
        this.quizModuleName = quizModuleName;

        ///
        if (!demoMode) {
            demoMode = parseDemoMode(qp.get("demoMode"), DemoMode.OFF);
        }
        this.demoMode = demoMode;

        ///
        if (!theme) {
            theme = parseThemeName(qp.get("theme"), ThemeName.dark);
        }
        this.theme = theme;

        ///
        if (isBooleanNullOrUndefined(enableSecretQuestionSkip)) {
            enableSecretQuestionSkip = parseBoolean(
                qp.get("enableSecretQuestionSkip"),
                false,
            );
        }
        this.enableSecretQuestionSkip = enableSecretQuestionSkip!;

        ///
        if (isBooleanNullOrUndefined(enableSecretWindowReload)) {
            enableSecretWindowReload = parseBoolean(
                qp.get("enableSecretWindowReload"),
                false,
            );
        }
        this.enableSecretWindowReload = enableSecretWindowReload!;

        ///
        this.guessButtonCount =
            guessButtonCount ?? //
            +(
                qp.get("guessButtonCount") ?? //
                "4"
            );

        ///
        this.maxQuestions =
            maxQuestions ?? //
            +(
                qp.get("maxQuestions") ?? //
                "0"
            );

        ///
        this.demoDelayMin =
            demoDelayMin ?? //
            +(
                qp.get("demoDelayMin") ?? //
                "25"
            );

        ///
        this.demoDelayMax =
            demoDelayMax ?? //
            +(
                qp.get("demoDelayMax") ?? //
                "2500"
            );

        ///
        $time.setTickTime(
            tickTime ?? //
                +(
                    qp.get("tickTime") ?? //
                    "750"
                ),
        );

        ///
        this.preloadImageCount =
            preloadImageCount ?? //
            +(
                qp.get("preloadImageCount") ?? //
                "0"
            );

        ///
        this.timerSeconds =
            timerSeconds ?? //
            +(
                qp.get("timerSeconds") ?? //
                "8"
            );

        ///
        if (isBooleanNullOrUndefined(pauseTimerBetweenQuestions)) {
            pauseTimerBetweenQuestions = parseBoolean(
                qp.get("pauseTimerBetweenQuestions"),
                false,
            );
        }
        this.pauseTimerBetweenQuestions = pauseTimerBetweenQuestions!;

        ///
        if (isBooleanNullOrUndefined(convertRemainingTimeToBonusPoints)) {
            convertRemainingTimeToBonusPoints = parseBoolean(
                qp.get("convertRemainingTimeToBonusPoints"),
                true,
            );
        }
        this.convertRemainingTimeToBonusPoints = convertRemainingTimeToBonusPoints!;

        ///
        if (isBooleanNullOrUndefined(forfeitQuestionOnTimeout)) {
            forfeitQuestionOnTimeout = parseBoolean(
                qp.get("forfeitQuestionOnTimeout"),
                true,
            );
        }
        this.forfeitQuestionOnTimeout = forfeitQuestionOnTimeout!;
    }
}
