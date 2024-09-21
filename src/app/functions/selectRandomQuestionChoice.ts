import QuizData from "../models/QuizData";
import QuizItem from "../models/QuizItem";

class RANDOMIZER {
    public static COUNT: number = 0;
    public static readonly EFFORT: number = 1;
    public static FAILSAFE: number = -1;
    public static INDEX: number = -1;
}

export default async function selectRandomQuestionChoice(
    currentGuessPool: string[],
    currentItem: QuizItem,
    quizData: QuizData,
): Promise<QuizItem> {
    const { randomizedGuessPool } = quizData;

    RANDOMIZER.COUNT = 0;
    RANDOMIZER.FAILSAFE = randomizedGuessPool.length * RANDOMIZER.EFFORT;

    while (++RANDOMIZER.COUNT < RANDOMIZER.FAILSAFE) {
        //
        if (++RANDOMIZER.INDEX === randomizedGuessPool.length) {
            RANDOMIZER.INDEX = 0;
        }

        const choiceItem = randomizedGuessPool[RANDOMIZER.INDEX];

        if (choiceItem.answeredCorrectly) {
            continue;
        }

        if (choiceItem.duplicateItemKeys.includes(currentItem.key)) {
            continue;
        }

        if (currentGuessPool.includes(choiceItem.key)) {
            continue;
        }
        return choiceItem;
    }
    throw new Error("Failed to find a question choice.");
}
