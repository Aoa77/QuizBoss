import { AppProps, QuizItem, showElementRef } from "../props";
import { GameState, ButtonState } from "../enums";
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

    delay.hideSpinner();
    showElementRef(elements.imageSection);

    showElementRef(elements.buttonsSection);
    showElementRef(elements.scoreSection);
    showElementRef(elements.progressSection);

    showElementRef(elements.questionHeading);
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

    setGameState(GameState.INPUT);
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
