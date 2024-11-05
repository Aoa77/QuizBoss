import { Duration } from "../libs/anime-context/AnimeContext.constants";
import { HttpUtility } from "../libs/friendlies/HttpUtility";
import { isBooleanNullOrUndefined } from "../libs/friendlies/BooleanBuddies";
import { parseBoolean } from "../libs/friendlies/BooleanBuddies";
import { DemoMode, parseDemoMode } from "../models/DemoMode";
import { parseThemeName, ThemeName } from "../models/Theme";

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

    public readonly oneTickAtSpeed: number;
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
        
        guessButtonCount?: number;
        maxQuestions?: number;
        preloadImageCount?: number;
        theme?: ThemeName;
        
        oneTickAtSpeed?: number;
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
            errorHandler: handleError,
            guessButtonCount,
            maxQuestions,
            oneTickAtSpeed,
            preloadImageCount,
            timerSeconds,
        } = params;

        ///
        const qp = HttpUtility.parseQueryString(window.location.search);

        ///
        this.errorHandler = handleError;

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
        this.oneTickAtSpeed =
            oneTickAtSpeed ?? //
            +(
                qp.get("oneTickAtSpeed") ?? //
                Duration.oneSecond.toString()
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
                "15"
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
