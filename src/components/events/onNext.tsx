import { InternalConfig } from "../Config";
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

    for (let choiceSpot = 0; choiceSpot < guessButtonCount; choiceSpot++) {
        //
        let choiceItemIndex = currentItemIndex;
        let hideDuplicateButton = false;

        if (choiceSpot !== answerSpot) {
            const randonlySelected = selectRandomQuestionChoice();
            choiceItemIndex = randonlySelected.choiceItemIndex;
            hideDuplicateButton = randonlySelected.isDuplicate;
        }
        console.debug(hideDuplicateButton);

        currentQuestionItemIndexChoices.push(
            assignQuestionToChoiceSpot(
                choiceItemIndex,
                choiceSpot,
                false,//hideDuplicateButton,
            ),
        );
    }
    setGameState(GameState.INPUT);
    return;

    function assignQuestionToChoiceSpot(
        choiceItemIndex: number,
        choiceSpot: number,
        hideButton: boolean,
    ): number {
        const spotButton = guessButtons[choiceSpot].ref.current!;
        spotButton.innerHTML = quizItems[choiceItemIndex].name;
        spotButton.value = quizItems[choiceItemIndex].key;
        spotButton.className = hideButton
            ? GuessButtonState.HIDDEN
            : GuessButtonState.NORMAL;
        return choiceItemIndex;
    }

    function selectRandomQuestionChoice() {
        //
        let choiceItemIndex: number = -1;
        let isBadQuestionChoice: boolean = true;
        let isDuplicate: boolean = false;
        let randomSelectLoopCount: number = 0;

        while (isBadQuestionChoice) {
            choiceItemIndex = util.randomInt(0, quizItems.length);
            const choiceItem = quizItems[choiceItemIndex];

            isDuplicate = [
                choiceItemIndex === currentItemIndex,
                currentQuestionItemIndexChoices.includes(choiceItemIndex),
            ].some((isDuplicate) => isDuplicate);

            isBadQuestionChoice = [
                isDuplicate,
                choiceItem.answeredCorrectly,
                choiceItem.duplicateItemKeys.includes(choiceItem.key),
            ].some((isBad) => isBad);

            if (
                ++randomSelectLoopCount >
                quizItems.length * InternalConfig.infiniteLoopFailSafeMultiplier
            ) {
                break;
            }
        }

        return { choiceItemIndex, isDuplicate };
    }
}
