import { Context } from "../Context";
import { GameState } from "../GameState";
import { GuessButtonState } from "../GuessButton";
import * as util from "../Util";

///
export function onNext(context: Context) {
    const {
        config,
        currentItemIndex,
        elements,
        guessButtons,
        quizModule,
        setGameState,
    } = context;

    const { guessButtonCount } = config;

    if (quizModule === null) {
        return;
    }
    const quizItems = quizModule.quizData.items;

    util.hideElement(elements.loading);
    util.showElement(elements.buttons);
    util.showElement(elements.image);
    util.showElement(elements.question);
    util.showElement(elements.score);
    util.showElement(elements.progress);

    const currentQuestionItemIndexChoices: number[] = [];
    const answerSpot = util.randomInt(0, guessButtonCount);
    console.info("answerSpot: ", answerSpot);

    function assignQuestionToChoiceSpot(
        choiceItemIndex: number,
        choiceSpot: number,
    ): number {
        const spotButton = guessButtons[choiceSpot].ref.current!;
        spotButton.innerHTML = quizItems[choiceItemIndex].name;
        spotButton.value = quizItems[choiceItemIndex].name;
        spotButton.className = GuessButtonState.NORMAL;
        return choiceItemIndex;
    }

    for (let choiceSpot = 0; choiceSpot < guessButtonCount; choiceSpot++) {
        //
        let choiceItemIndex = currentItemIndex;

        if (choiceSpot !== answerSpot) {
            let isBadQuestionChoice = true;
            while (isBadQuestionChoice) {
                choiceItemIndex = util.randomInt(0, quizItems.length);
                const choiceItem = quizItems[choiceItemIndex];
                isBadQuestionChoice = [
                    choiceItemIndex === currentItemIndex,
                    currentQuestionItemIndexChoices.includes(choiceItemIndex),
                    choiceItem.answeredCorrectly,
                    choiceItem.duplicateItemKeys.includes(choiceItem.key),
                ].some((areBad) => areBad);
            }
        }

        currentQuestionItemIndexChoices.push(
            assignQuestionToChoiceSpot(choiceItemIndex, choiceSpot),
        );
    }
    setGameState(GameState.INPUT);
}
