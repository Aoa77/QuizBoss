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
    let dummyIndex = 0;

    if (quizModule === null) {
        return;
    }
    const quizItems = quizModule.quizData.items;
    const currentItem = quizItems[currentItemIndex];

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

        if (choiceSpot !== answerSpot) {
            choiceItemIndex = selectRandomQuestionChoice();
        }

        currentQuestionItemIndexChoices.push(
            assignQuestionToChoiceSpot(choiceItemIndex, choiceSpot),
        );
    }

    setGameState(GameState.INPUT);
    return;

    function assignQuestionToChoiceSpot(
        choiceItemIndex: number,
        choiceSpot: number,
    ): number {
        if (quizModule === null) {
            throw new Error("Quiz module is null");
        }
        const spotButton = guessButtons[choiceSpot].ref.current!;
        if (choiceItemIndex < 0) {
            spotButton.innerHTML = "";
            spotButton.value = "";
            spotButton.className = GuessButtonState.DISABLED;
            if (config.enableDummies) {
                if (dummyIndex === quizModule.quizData.dummies.length) {
                    dummyIndex = 0;
                }
                spotButton.innerHTML = quizModule.quizData.dummies[dummyIndex];
                spotButton.value = quizModule?.quizData.dummies[dummyIndex];
                spotButton.className = GuessButtonState.NORMAL;
                dummyIndex++;
            }
            return choiceItemIndex;
        }
        spotButton.innerHTML = quizItems[choiceItemIndex].name;
        spotButton.value = quizItems[choiceItemIndex].key;
        spotButton.className = GuessButtonState.NORMAL;
        return choiceItemIndex;
    }

    function selectRandomQuestionChoice() {
        //
        const failSafe: number =
            quizItems.length * InternalConfig.infiniteLoopFailSafeMultiplier;
        let choiceItemIndex: number = -1;
        let isBadQuestionChoice: boolean = true;
        let randomSelectLoopCount: number = 0;

        while (isBadQuestionChoice) {
            choiceItemIndex = util.randomInt(0, quizItems.length);
            const choiceItem = quizItems[choiceItemIndex];

            isBadQuestionChoice = [
                choiceItemIndex === currentItemIndex,
                currentQuestionItemIndexChoices.includes(choiceItemIndex),
                choiceItem.answeredCorrectly,
                choiceItem.duplicateItemKeys.includes(currentItem.key),
            ].some((isBad) => isBad);

            if (++randomSelectLoopCount > failSafe) {
                return -1;
            }
        }

        return choiceItemIndex;
    }
}
