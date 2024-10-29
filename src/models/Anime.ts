import { AnimeContext, AnimeRefObject } from "../libs/anime-context/AnimeContext";

export enum AnimeComponent {
    GuessButton = "GuessButton",
    LoadingProgress = "LoadingProgress",
    LoadingSpinner = "LoadingSpinner",
    QuestionImage = "QuestionImage",
    QuestionText = "QuestionText",
    QuizTitle = "QuizTitle",
}

export class Anime {
    public static get GuessButton(): AnimeRefObject {
        return AnimeContext.get(AnimeComponent.GuessButton)!;
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
}
