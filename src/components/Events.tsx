import { Context } from "./Context";
import { GameState } from "./GameState";
import { GuessButtonState } from "./GuessButton";
import { initQuizModule } from "./QuizModule";
import {
    hideElement,
    showElement,
    delay,
    randomInteger,
    booleanAll,
    assertInteger,
} from "./Util";

///
var isInitializing: boolean = false;
var wrongGuesses: number[] = [];

///
export async function onInit(context: Context) {
    const { config, elements, setQuizModule } = context;
    showElement(elements.loading);

    console.info({ isInitializing });
    if (isInitializing) {
        return;
    }
    isInitializing = true;

    await initQuizModule(config, setQuizModule);
    context.setGameState(GameState.STARTUP);
}

///
export async function onStartup(context: Context) {
    const { elements, setGameState } = context;
    showElement(elements.title);
    setGameState(GameState.LOADING);
}

///
export async function onLoading(context: Context) {
    const {
        config,
        currentItemIndex, //
        elements,
        quizModule,
        setGameState,
    } = context;

    if (quizModule === null) {
        return;
    }

    const quizItems = quizModule.quizData.items;
    const currentItem = quizItems[currentItemIndex];

    hideElement(elements.image);
    showElement(elements.loading);

    await delay(config.nextDelay);
    while (!currentItem || !currentItem.isLoaded) {
        await delay(config.spinnerPoll);
    }

    await delay(config.nextDelay);
    setGameState(GameState.NEXT);
}

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

    const guessButtonCount = assertInteger(config.guessButtonCount);
    if (quizModule === null) {
        return;
    }
    const quizItems = quizModule.quizData.items;

    hideElement(elements.loading);
    showElement(elements.buttons);
    showElement(elements.image);
    showElement(elements.question);
    showElement(elements.score);
    showElement(elements.progress);

    const currentQuestionItemIndexChoices: number[] = [];
    const answerSpot = randomInteger(0, guessButtonCount);
    console.info("answerSpot: ", answerSpot);

    for (let guess = 0; guess < guessButtonCount; guess++) {
        let choiceItemIndex = currentItemIndex;
        if (guess !== answerSpot) {
            while (true) {
                choiceItemIndex = randomInteger(0, quizItems.length);
                if (
                    booleanAll([
                        choiceItemIndex !== currentItemIndex,
                        !currentQuestionItemIndexChoices.includes(
                            choiceItemIndex,
                        ),
                        !quizItems[choiceItemIndex].answeredCorrectly,
                        !quizItems[choiceItemIndex].duplicateItemKeys.includes(
                            quizItems[currentItemIndex].key,
                        ),
                    ])
                ) {
                    break;
                }
            }
        }
        currentQuestionItemIndexChoices.push(choiceItemIndex);
        const ref = guessButtons[guess].ref.current!;
        ref.innerHTML = quizItems[choiceItemIndex].name;
        ref.value = quizItems[choiceItemIndex].name;
        ref.className = GuessButtonState.NORMAL;
    }
    setGameState(GameState.INPUT);
}

///
export async function onResult(context: Context) {
    const {
        config,
        currentItemIndex,
        elements,
        guessButtons,
        guessValue,
        quizModule,
        setCurrentItemIndex,
        setGameState,
    } = context;

    const guessButtonCount = assertInteger(config.guessButtonCount);
    if (quizModule === null) {
        return;
    }
    const quizItems = quizModule.quizData.items;
    const currentItem = quizItems[currentItemIndex];
    const correctAnswer = currentItem.name;

    for (let guess = 0; guess < guessButtonCount; guess++) {
        const ref = guessButtons[guess].ref.current!;
        if (guessValue !== ref.value) {
            ref.className = GuessButtonState.DIMMED;
            continue;
        }

        if (guessValue === correctAnswer) {
            ref.className = GuessButtonState.CORRECT;
            currentItem.answeredCorrectly = true;
            continue;
        }

        wrongGuesses.push(guess);
        ref.className = GuessButtonState.WRONG;
    }

    if (guessValue === correctAnswer) {
        context.setScore(
            context.score +
                assertInteger(config.guessButtonCount) -
                wrongGuesses.length - 1,
        );
        hideElement(elements.image);
        setCurrentItemIndex(currentItemIndex + 1);
        wrongGuesses = [];
        setGameState(GameState.LOADING);
        return;
    }

    await delay(config.nextDelay);

    for (let guess = 0; guess < guessButtonCount; guess++) {
        const ref = guessButtons[guess].ref.current!;
        switch (ref.className) {
            case GuessButtonState.DIMMED:
                if (!wrongGuesses.includes(guess)) {
                    ref.className = GuessButtonState.NORMAL;
                }
                break;
            case GuessButtonState.WRONG:
                ref.className = GuessButtonState.DIMMED;
                break;
            default:
                break;
        }
    }

    setGameState(GameState.INPUT);
}
