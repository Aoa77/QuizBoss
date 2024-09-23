import { getXrefButtons } from "../../core/elements/buttons";
import { QuizData } from "../models/QuizData";
import { QuizItem } from "../models/QuizItem";
import { assignAnswerToButton } from "./assignAnswerToButton";
import { selectRandomQuestionChoice } from "./selectRandomQuestionChoice";

export async function bindGuessButtons(
    answerSpot: number,
    currentGuessPool: string[],
    currentItem: QuizItem,
    quizData: QuizData,
) {
    const buttons = getXrefButtons();
    for (
        let buttonIndex = 0;
        buttonIndex < buttons.length;
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
