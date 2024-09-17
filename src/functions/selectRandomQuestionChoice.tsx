import QuizData from "../state/QuizData";
import QuizItem from "../state/QuizItem";
import delay from "../time/delay";
import { Duration } from "../time/Duration";

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
        
        console.info("COUNT", RANDOMIZER.COUNT);
        console.info("FAILSAFE", RANDOMIZER.FAILSAFE);
        console.info("INDEX", RANDOMIZER.INDEX);
        console.info("randomizedGuessPool", randomizedGuessPool);
        await delay(Duration.ONE_SECOND);

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
