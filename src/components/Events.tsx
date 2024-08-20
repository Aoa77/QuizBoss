import { Context } from "./Context";
import { extractQuizItems } from "./QuizModule";
import { GameState } from "./GameState";
import { GuessButtonCount, GuessButtonState } from "./GuessButton";
import { hideElement, showElement, delay, randomInt } from "./Util";

var first = true;
var wrongGuesses: number[] = [];

export async function onStartup(context: Context) {
    const { config, elements, setGameState } = context;
    hideElement(elements.image);
    showElement(elements.title);
    await delay(config.spinnerPoll!);
    setGameState(GameState.LOADING);
}

export async function onLoading(context: Context) {
    const { config, currentItemIndex, elements, quizModule, setGameState } =
        context;
    const quizItems = extractQuizItems(quizModule);
    const currentItem = quizItems[currentItemIndex];

    hideElement(elements.image);
    if (first) {
        await delay(config.spinnerPoll! * 4);
    }
    first = false;
    showElement(elements.loading);

    await delay(config.spinnerPoll! * 3);
    while (!currentItem || !currentItem.isLoaded) {
        await delay(config.spinnerPoll!);
    }

    await delay(config.nextDelay!);
    setGameState(GameState.NEXT);
}

export function onNext(context: Context) {
    const {
        currentItemIndex,
        elements,
        guessButtons,
        quizModule,
        setGameState,
    } = context;
    const quizItems = extractQuizItems(quizModule);

    hideElement(elements.loading);
    showElement(elements.buttons);
    showElement(elements.image);
    showElement(elements.question);

    const currentQuestionItemIndexChoices: number[] = [];
    const answerSpot: number = randomInt(0, GuessButtonCount);
    console.info("answerSpot: ", answerSpot);

    for (let guess = 0; guess < GuessButtonCount; guess++) {
        let choiceItemIndex = currentItemIndex;
        if (guess !== answerSpot) {
            while (true) {
                choiceItemIndex = randomInt(0, quizItems.length);
                if (
                    choiceItemIndex !== currentItemIndex &&
                    !currentQuestionItemIndexChoices.includes(
                        choiceItemIndex,
                    ) &&
                    !quizItems[choiceItemIndex].answeredCorrectly
                ) {
                    break;
                }
            }
        }
        currentQuestionItemIndexChoices.push(choiceItemIndex);
        const ref = guessButtons[guess].ref.current!;
        ref.innerHTML = quizItems[choiceItemIndex].name;
        //ref.innerHTML = "South Georgia and the South Sandwich Islands"; // longest value for testing
        ref.value = quizItems[choiceItemIndex].name;
        ref.className = GuessButtonState.NORMAL;
    }
    setGameState(GameState.INPUT);
}

export async function onResult(context: Context) {
    const {
        currentItemIndex,
        elements,
        guessButtons,
        guessValue,
        quizModule,
        setCurrentItemIndex,
        setGameState,
    } = context;
    const quizItems = extractQuizItems(quizModule);
    const currentItem = quizItems[currentItemIndex];
    const correctAnswer = currentItem.name;

    for (let guess = 0; guess < GuessButtonCount; guess++) {
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

        //setGuessPoints(guessPoints - 1);
        wrongGuesses.push(guess);
        ref.className = GuessButtonState.WRONG;
    }

    if (guessValue === correctAnswer) {
        hideElement(elements.image);
        setCurrentItemIndex(currentItemIndex + 1);
        wrongGuesses = [];
        setGameState(GameState.LOADING);
        return;
    }

    await delay(1000);

    for (let guess = 0; guess < GuessButtonCount; guess++) {
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
