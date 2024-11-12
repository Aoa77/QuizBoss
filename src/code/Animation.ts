import { AnimeContext } from "../libs/anime-context/AnimeContext";
import { AnimeRef } from "../libs/anime-context/AnimeRef";

export enum AnimComponent {
    GuessButton      = "GuessButton",
    GuessPoints      = "GuessPoints",
    TimeBonus        = "TimeBonus",
    LoadingMessage   = "LoadingMessage",
    LoadingSpinner   = "LoadingSpinner",
    QuestionImage    = "QuestionImage",
    QuestionText     = "QuestionText",
    QuestionTimer    = "QuestionTimer",
    QuizProgress     = "QuizProgress",
    QuizTitle        = "QuizTitle",
    ScoreInfo        = "ScoreInfo",
}

export interface GuessButtonRef extends AnimeRef {
    scaleMin: number;
    scaleMax: number;
    scaleUp: number[];
    scaleDown: number[];
}

export class Animation {
    public static GuessButton(index: number): GuessButtonRef {
        const animeRef = AnimeContext.get(AnimComponent.GuessButton, index)!;
        const buttonRef: GuessButtonRef = {
            ...animeRef,
            scaleMin: 1.0,
            scaleMax: 1.3,
            scaleUp: [],
            scaleDown: [],
        };
        buttonRef.scaleUp = [buttonRef.scaleMin, buttonRef.scaleMax];
        buttonRef.scaleDown = [buttonRef.scaleMax, buttonRef.scaleMin];
        return buttonRef;
    }

    public static get GuessPoints(): AnimeRef {
        return AnimeContext.get(AnimComponent.GuessPoints)!;
    }

    public static get TimeBonus(): AnimeRef {
        return AnimeContext.get(AnimComponent.TimeBonus)!;
    }

    public static get LoadingMessage(): AnimeRef {
        return AnimeContext.get(AnimComponent.LoadingMessage)!;
    }

    public static get LoadingSpinner(): AnimeRef {
        return AnimeContext.get(AnimComponent.LoadingSpinner)!;
    }

    public static get QuestionImage(): AnimeRef {
        return AnimeContext.get(AnimComponent.QuestionImage)!;
    }

    public static get QuestionText(): AnimeRef {
        return AnimeContext.get(AnimComponent.QuestionText)!;
    }

    public static get QuestionTimer(): AnimeRef {
        return AnimeContext.get(AnimComponent.QuestionTimer)!;
    }

    public static get QuizProgress(): AnimeRef {
        return AnimeContext.get(AnimComponent.QuizProgress)!;
    }

    public static get QuizTitle(): AnimeRef {
        return AnimeContext.get(AnimComponent.QuizTitle)!;
    }

    public static get ScoreInfo(): AnimeRef {
        return AnimeContext.get(AnimComponent.ScoreInfo)!;
    }
}
