import { randomInt } from "../utilities";
import { AppContext, GameState, QuizItem } from "../app";
import { ButtonState } from "../buttons";

var randomizedGuessPoolIndex: number = -1;
///
export async function onNext(context: AppContext) {
    const { config, elements, states, time } = context;
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
        title,
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

    let multiplier: number = 1;
    await Promise.all([
        elements.fadeOut(loading.target, { multiplier }),
        elements.fadeIn(image.target, { multiplier }),
    ]);
    await elements.fadeIn(appVersion.target, { multiplier });

    await Promise.all([
        elements.fadeIn(question.target, { multiplier }),
        elements.fadeIn(buttonArea.target, { multiplier }),
        elements.fadeIn(scoreArea.target, { multiplier }),
        elements.fadeIn(progress.target, { multiplier }),
        elements.fadeIn(appVersion.target, { multiplier }),
    ]);

    multiplier = 2;
    await time.delay({ multiplier });
    
    multiplier = 1;
    for (let button of guessButtons) {
        await elements.fadeIn(button.target, { multiplier });
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
