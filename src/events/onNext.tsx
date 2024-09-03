import { GameState, ButtonState } from "../enums";
import { AppContext, QuizItem } from "../models";
import { randomInt } from "../utilities/random";

var randomizedGuessPoolIndex: number = -1;
///
export async function onNext(context: AppContext) {
    const { config, elementsHook, stateHook } = context;
    const { state, setState } = stateHook;
    const { guessButtons } = elementsHook;

    if (state.quizModule === null) {
        return;
    }

    const { guessButtonCount } = config;
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const randomizedGuessPool = quizData.randomizedGuessPool;
    let currentGuessPool: string[] = [];

    elementsHook.hideSpinner();
    elementsHook.showImageSection();

    elementsHook.showButtonsSection();
    elementsHook.showScoreSection();
    elementsHook.showProgressSection();
    elementsHook.showQuestionHeading();

    const answerSpot = randomInt(0, guessButtonCount);
    console.info("answerSpot: ", answerSpot);

    for (let choiceSpot = 0; choiceSpot < guessButtonCount; choiceSpot++) {
        let itemAtChoiceSpot = currentItem;

        if (choiceSpot !== answerSpot) {
            itemAtChoiceSpot = selectRandomQuestionChoice();
        }

        currentGuessPool.push(itemAtChoiceSpot.key);
        await assignQuestionToChoiceSpot(choiceSpot, itemAtChoiceSpot);
    }

    setState({ ...state, gameState: GameState.INPUT });
    return;

    async function assignQuestionToChoiceSpot(
        choiceSpot: number,
        itemAtChoiceSpot: QuizItem,
    ) {
        const spotButton = guessButtons[choiceSpot].ref.current!;
        spotButton.innerHTML = itemAtChoiceSpot.name;
        spotButton.value = itemAtChoiceSpot.key;
        spotButton.className = ButtonState.NORMAL;
    }

    function selectRandomQuestionChoice(): QuizItem {
        const guessPoolLoops: number = 4;
        let failSafeCounter = 0;
        while (
            ++failSafeCounter <
            randomizedGuessPool.length * guessPoolLoops
        ) {
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
