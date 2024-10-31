import { AnimeContext } from "../libs/anime-context/AnimeContext";
import { Scale } from "../libs/anime-context/AnimeContext.constants";
import { AnimeRef } from "../libs/anime-context/AnimeRef";

export enum AnimeComponent {
    CorrectGuessPoints = "CorrectGuessPoints",
    GuessButton = "GuessButton",
    LoadingProgress = "LoadingProgress",
    LoadingSpinner = "LoadingSpinner",
    QuestionImage = "QuestionImage",
    QuestionText = "QuestionText",
    QuestionTimer = "QuestionTimer",
    QuizProgress = "QuizProgress",
    QuizTitle = "QuizTitle",
    RevealGuessNoPoints = "RevealGuessNoPoints",
    ScoreInfo = "ScoreInfo",
}

export interface GuessButtonRef extends AnimeRef {
    scaleMin: number;
    scaleMax: number;
    scaleUp: number[];
    scaleDown: number[];
}

export class Anime {
    public static get CorrectGuessPoints(): AnimeRef {
        return AnimeContext.get(AnimeComponent.CorrectGuessPoints)!;
    }

    public static GuessButton(index: number): GuessButtonRef {
        const animeRef = AnimeContext.get(AnimeComponent.GuessButton, index)!;
        const buttonRef: GuessButtonRef = {
            ...animeRef,
            scaleMin: Scale.one,
            scaleMax: 1.3,
            scaleUp: [],
            scaleDown: [],
        };
        buttonRef.scaleUp = [buttonRef.scaleMin, buttonRef.scaleMax];
        buttonRef.scaleDown = [buttonRef.scaleMax, buttonRef.scaleMin];
        return buttonRef;
    }

    public static get LoadingProgress(): AnimeRef {
        return AnimeContext.get(AnimeComponent.LoadingProgress)!;
    }

    public static get LoadingSpinner(): AnimeRef {
        return AnimeContext.get(AnimeComponent.LoadingSpinner)!;
    }

    public static get QuestionImage(): AnimeRef {
        return AnimeContext.get(AnimeComponent.QuestionImage)!;
    }

    public static get QuestionText(): AnimeRef {
        return AnimeContext.get(AnimeComponent.QuestionText)!;
    }

    public static get QuestionTimer(): AnimeRef {
        return AnimeContext.get(AnimeComponent.QuestionTimer)!;
    }

    public static get QuizProgress(): AnimeRef {
        return AnimeContext.get(AnimeComponent.QuizProgress)!;
    }

    public static get QuizTitle(): AnimeRef {
        return AnimeContext.get(AnimeComponent.QuizTitle)!;
    }

    public static get RevealGuessNoPoints(): AnimeRef {
        return AnimeContext.get(AnimeComponent.RevealGuessNoPoints)!;
    }

    public static get ScoreInfo(): AnimeRef {
        return AnimeContext.get(AnimeComponent.ScoreInfo)!;
    }
}
