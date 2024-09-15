import { randomInt } from "../random";
import { ButtonState } from "../buttons";
import { AppContext } from "../app";
import { GameState, QuizItem } from "../state";
import { delay, Duration } from "../time";

///
export async function onNext(context: AppContext) {
    let randomizedGuessPoolIndex: number = -1;
    const { config, elements, states } = context;
    const { state, setState } = states;
    const { refs, guessButtons } = elements;
    const {
        appVersion,
        buttonArea,
        image,
        loading,
        progress,
        question,
        scoreArea,
    } = refs;

    if (state.quizModule === null) {
        return;
    }

    const { guessButtonCount } = config;
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const randomizedGuessPool = quizData.randomizedGuessPool;
    let currentGuessPool: string[] = [];

    elements.clearScoreBonusStyle();
    state.answerSpot = randomInt(0, guessButtonCount);
    console.info("answerSpot: ", state.answerSpot);
    await assignAnswersToButtons();

    await Promise.all([
        await elements.fadeOut(loading.target),
        await elements.fadeIn(image.target),
    ]);
    await elements.fadeIn(appVersion.target);

    await Promise.all([
        await elements.fadeIn(question.target),
        await elements.fadeIn(buttonArea.target),
        await elements.fadeIn(scoreArea.target),
        await elements.fadeIn(progress.target),
        await elements.fadeIn(appVersion.target),
    ]);

    // await delay(Duration.WAIT, 1);
    for (let button of guessButtons) {
        await elements.fadeIn(button.target);
    }

    setState({ ...state, gameState: GameState.INPUT });
    return;

    async function assignAnswersToButtons() {
        for (
            let buttonIndex = 0;
            buttonIndex < guessButtonCount;
            buttonIndex++
        ) {
            let item = currentItem;
            if (buttonIndex !== state.answerSpot) {
                item = selectRandomQuestionChoice();
            }
            currentGuessPool.push(item.key);
            await assignAnswerToButton(buttonIndex, item);
        }
    }

    async function assignAnswerToButton(buttonIndex: number, item: QuizItem) {
        const spotButton = guessButtons[buttonIndex].ref.current!;
        spotButton.innerHTML = item.name;
        spotButton.value = item.key;
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
