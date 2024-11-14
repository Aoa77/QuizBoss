import { AnimeRef, AnimeContext } from "../libs/anime-context";
import { AnimKey } from "./AnimKey";

export * from "./AnimKey";
export * from "./answerScoreTransition";
export * from "./buttonSlide";
export * from "./concludeButtonReveal";
export * from "./concludeFinalGuess";
export * from "./hideAppLoader";
export * from "./revealCorrectButton";

export class Anim {
    public static get AnswerPoints(): AnimeRef {
        return AnimeContext.get(AnimKey.AnswerPoints)!;
    }

    public static get AnswerPointsTimeBonus(): AnimeRef {
        return AnimeContext.get(AnimKey.AnswerPointsTimeBonus)!;
    }

    public static get AppTitle(): AnimeRef {
        return AnimeContext.get(AnimKey.AppTitle)!;
    }

    public static get AppVersion(): AnimeRef {
        return AnimeContext.get(AnimKey.AppVersion)!;
    }

    public static GuessButton(index: number): AnimeRef {
        return AnimeContext.get(AnimKey.GuessButton, index)!;
    }

    public static get LoadingSpinner(): AnimeRef {
        return AnimeContext.get(AnimKey.LoadingSpinner)!;
    }

    public static get QuestionImage(): AnimeRef {
        return AnimeContext.get(AnimKey.QuestionImage)!;
    }

    public static get QuestionText(): AnimeRef {
        return AnimeContext.get(AnimKey.QuestionText)!;
    }

    public static get QuestionTimer(): AnimeRef {
        return AnimeContext.get(AnimKey.QuestionTimer)!;
    }

    public static get QuizProgress(): AnimeRef {
        return AnimeContext.get(AnimKey.QuizProgress)!;
    }

    public static get QuizTitle(): AnimeRef {
        return AnimeContext.get(AnimKey.QuizTitle)!;
    }

    public static get ScoreInfo(): AnimeRef {
        return AnimeContext.get(AnimKey.ScoreInfo)!;
    }
}
