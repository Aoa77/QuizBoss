import { AnimeContext } from "../libs/anime-context/AnimeContext";
import { AnimeRef } from "../libs/anime-context/AnimeRef";

export enum AnimeComponent {
    CorrectGuessPoints = "CorrectGuessPoints",
    GuessButton = "GuessButton",
    LoadingProgress = "LoadingProgress",
    LoadingSpinner = "LoadingSpinner",
    QuestionImage = "QuestionImage",
    QuestionText = "QuestionText",
    QuizTitle = "QuizTitle",
    RevealGuessNoPoints = "RevealGuessNoPoints",
    ScoreInfo = "ScoreInfo",
}

export class Anime {
    public static get CorrectGuessPoints(): AnimeRef {
        return AnimeContext.get(AnimeComponent.CorrectGuessPoints)!;
    }

    public static GuessButton(index: number): AnimeRef {
        return AnimeContext.get(AnimeComponent.GuessButton, index)!;
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
