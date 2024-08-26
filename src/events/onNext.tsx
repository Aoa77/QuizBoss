import { AppProps, QuizItem } from "../props";
import { GameState, ButtonState } from "../enums";
import { hideElementRef, showElementRef } from "../utilities/visibility";
import { randomInt } from "../utilities/random";

var randomizedGuessPoolIndex: number = -1;
///
export async function onNext(props: AppProps) {
    const {
        config,
        currentItemIndex,
        delay,
        elements,
        guessButtons,
        quizModule,
        setGameState,
    } = props;

    if (quizModule === null) {
        return;
    }

    const { guessButtonCount } = config;
    const quizData = quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[currentItemIndex];
    const randomizedGuessPool = quizData.randomizedGuessPool;
    let currentGuessPool: string[] = [];

    hideElementRef(elements.loadingSection);
    showElementRef(elements.imageSection);

    await delay.questionHeading();
    showElementRef(elements.questionHeading);
    
    showElementRef(elements.buttonsSection);
    showElementRef(elements.scoreSection);
    showElementRef(elements.progressSection);

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

    if (config.demoMode) {
        const spotButton = guessButtons[answerSpot].ref.current!;
        await delay.spinnerPoll();
        props.setGuessValue(spotButton.value);
        setGameState(GameState.RESULT);
        return;
    }

    setGameState(GameState.INPUT);
    return;

    async function assignQuestionToChoiceSpot(
        choiceSpot: number,
        itemAtChoiceSpot: QuizItem,
    ) {
        const spotButton = guessButtons[choiceSpot].ref.current!;
        spotButton.innerHTML = itemAtChoiceSpot.name;
        spotButton.value = itemAtChoiceSpot.key;
        await delay.questionHeading();
        spotButton.className = ButtonState.NORMAL;
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
