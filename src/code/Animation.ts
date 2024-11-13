import { AnimeContext, AnimeRef } from "../libs/anime-context";

export enum ANIM {
    AppTitle = "AppTitle",
    GuessButton = "GuessButton",
    GuessPoints = "GuessPoints",
    TimeBonus = "TimeBonus",
    LoadingSpinner = "LoadingSpinner",
    QuestionImage = "QuestionImage",
    QuestionText = "QuestionText",
    QuestionTimer = "QuestionTimer",
    QuizProgress = "QuizProgress",
    QuizTitle = "QuizTitle",
    ScoreInfo = "ScoreInfo",
}

export class Anim {
    public static get AppTitle(): AnimeRef {
        return AnimeContext.get(ANIM.AppTitle)!;
    }

    public static GuessButton(index: number): AnimeRef {
        return AnimeContext.get(ANIM.GuessButton, index)!;
    }

    public static get GuessPoints(): AnimeRef {
        return AnimeContext.get(ANIM.GuessPoints)!;
    }

    public static get TimeBonus(): AnimeRef {
        return AnimeContext.get(ANIM.TimeBonus)!;
    }

    public static get LoadingSpinner(): AnimeRef {
        return AnimeContext.get(ANIM.LoadingSpinner)!;
    }

    public static get QuestionImage(): AnimeRef {
        return AnimeContext.get(ANIM.QuestionImage)!;
    }

    public static get QuestionText(): AnimeRef {
        return AnimeContext.get(ANIM.QuestionText)!;
    }

    public static get QuestionTimer(): AnimeRef {
        return AnimeContext.get(ANIM.QuestionTimer)!;
    }

    public static get QuizProgress(): AnimeRef {
        return AnimeContext.get(ANIM.QuizProgress)!;
    }

    public static get QuizTitle(): AnimeRef {
        return AnimeContext.get(ANIM.QuizTitle)!;
    }

    public static get ScoreInfo(): AnimeRef {
        return AnimeContext.get(ANIM.ScoreInfo)!;
    }
}
