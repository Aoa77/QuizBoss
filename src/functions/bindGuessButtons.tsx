import ButtonElement from "../elements/buttons/ButtonElement";
import QuizData from "../state/QuizData";
import QuizItem from "../state/QuizItem";
import assignAnswerToButton from "./assignAnswerToButton";
import selectRandomQuestionChoice from "./selectRandomQuestionChoice";

export default async function bindGuessButtons(
    answerSpot: number,
    currentGuessPool: string[],
    currentItem: QuizItem,
    guessButtons: ButtonElement[],
    quizData: QuizData,
) {
    for (
        let buttonIndex = 0;
        buttonIndex < guessButtons.length;
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
        await assignAnswerToButton(buttonIndex, guessButtons, item);
    }
}
