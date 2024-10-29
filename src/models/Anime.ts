import { AnimeContext, AnimeRefObject } from "../libs/anime-context/AnimeContext";

export enum AnimeComponent {
    GuessButton = "GuessButton",
    LoadingProgress = "LoadingProgress",
    LoadingSpinner = "LoadingSpinner",
    LoadingSpinnerBall = "LoadingSpinnerBall",
    QuestionImage = "QuestionImage",
    QuestionText = "QuestionText",
    QuizTitle = "QuizTitle",
}

export class Anime {
    public static GuessButton(index: number): AnimeRefObject {
        return AnimeContext.get(AnimeComponent.GuessButton, index)!;
    }

    public static get LoadingProgress(): AnimeRefObject {
        return AnimeContext.get(AnimeComponent.LoadingProgress)!;
    }

    public static get LoadingSpinner(): AnimeRefObject {
        return AnimeContext.get(AnimeComponent.LoadingSpinner)!;
    }

    public static get QuestionImage(): AnimeRefObject {
        return AnimeContext.get(AnimeComponent.QuestionImage)!;
    }

    public static get QuestionText(): AnimeRefObject {
        return AnimeContext.get(AnimeComponent.QuestionText)!;
    }

    public static get QuizTitle(): AnimeRefObject {
        return AnimeContext.get(AnimeComponent.QuizTitle)!;
    }
}
