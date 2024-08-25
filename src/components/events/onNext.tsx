import { InternalConfig } from "../Config";
import { Context } from "../Context";
import { GameState } from "../GameState";
import { GuessButtonState } from "../GuessButton";
import { QuizItem } from "../QuizModule";
import * as util from "../Util";

var randomizedGuessPoolIndex: number = -1;
///
export async function onNext(context: Context) {
    const {
        config,
        currentItemIndex,
        elements,
        guessButtons,
        quizModule,
        setGameState,
    } = context;

    if (quizModule === null) {
        return;
    }

    const { guessButtonCount } = config;
    const quizData = quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[currentItemIndex];
    const randomizedGuessPool = quizData.randomizedGuessPool;
    let currentGuessPool: string[] = [];

    util.hideElement(elements.loading);
    util.showElement(elements.buttons);
    util.showElement(elements.image);
    util.showElement(elements.question);
    util.showElement(elements.score);
    util.showElement(elements.progress);

    const answerSpot = util.randomInt(0, guessButtonCount);
    console.info("answerSpot: ", answerSpot);

    for (let choiceSpot = 0; choiceSpot < guessButtonCount; choiceSpot++) {
        let itemAtChoiceSpot = currentItem;

        if (choiceSpot !== answerSpot) {
            itemAtChoiceSpot = selectRandomQuestionChoice();
        }

        currentGuessPool.push(itemAtChoiceSpot.key);
        assignQuestionToChoiceSpot(choiceSpot, itemAtChoiceSpot);
    }

    if (InternalConfig.runTestAutomation) {
        const spotButton = guessButtons[answerSpot].ref.current!;
        await util.delay(config.nextDelay);
        context.setGuessValue(spotButton.value);
        setGameState(GameState.RESULT);
        return;
    }

    setGameState(GameState.INPUT);
    return;

    function assignQuestionToChoiceSpot(
        choiceSpot: number,
        itemAtChoiceSpot: QuizItem,
    ) {
        const spotButton = guessButtons[choiceSpot].ref.current!;
        spotButton.innerHTML = itemAtChoiceSpot.name;
        spotButton.value = itemAtChoiceSpot.key;
        spotButton.className = GuessButtonState.NORMAL;
    }

    function selectRandomQuestionChoice(): QuizItem {
        let failSafeCounter = 0;
        while (++failSafeCounter < randomizedGuessPool.length + 2) {
            if (++randomizedGuessPoolIndex === randomizedGuessPool.length) {
                randomizedGuessPoolIndex = 0;
            }
            const choiceItem = randomizedGuessPool[randomizedGuessPoolIndex];
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
}
