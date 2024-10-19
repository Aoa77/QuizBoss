import { QuizData } from "../../../../src/models/QuizData";
import { QuizItem } from "../../../../src/models/QuizItem";
import { assignAnswerToButton } from "./assignAnswerToButton";
import { selectRandomQuestionChoice } from "./selectRandomQuestionChoice";

export async function bindGuessButtons(
    answerSpot: number,
    guessButtonCount: number,
    currentGuessPool: string[],
    currentItem: QuizItem,
    quizData: QuizData,
) {
    for (
        let buttonIndex = 0;
        buttonIndex < guessButtonCount;
        buttonIndex++
    ) {
        let item = currentItem;
        if (buttonIndex !== answerSpot) {
            item = await selectRandomQuestionChoice(
                currentGuessPool,
                currentItem,
                quizData,
            );
        }
        currentGuessPool.push(item.key);
        await assignAnswerToButton(buttonIndex, item);
    }
}
