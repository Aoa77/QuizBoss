import { AppProps, hideElementRef } from "../props";
import { GameState, ButtonState } from "../enums";

///
var wrongGuesses: number[] = [];

///
export async function onResult(props: AppProps) {
    const {
        config,
        currentItemIndex,
        delay,
        elements,
        guessButtons,
        guessValue,
        quizModule,
        setCurrentItemIndex,
        setGameState,
    } = props;

    const { guessButtonCount } = config;
    if (quizModule === null) {
        return;
    }

    const quizItems = quizModule.quizData.items;
    const currentItem = quizItems[currentItemIndex];
    const correctAnswer = currentItem.key;
    const isCorrectGuess = correctAnswer === guessValue;

    const correctButton = lockButtons();
    if (isCorrectGuess) {
        await handleCorrectGuess();
        return;
    }

    await delay.resultPause();
    unlockButtons();
    setGameState(GameState.INPUT);
    return;

    function lockButtons(): HTMLButtonElement | null {
        let correctButton: HTMLButtonElement | null = null;
        for (let guess = 0; guess < guessButtonCount; guess++) {
            const guessButton = guessButtons[guess].ref.current!;
            if (guessButton.className === ButtonState.DISABLED) {
                continue;
            }
            if (guessButton.className === ButtonState.HIDDEN) {
                continue;
            }
            if (guessValue !== guessButton.value) {
                guessButton.className = ButtonState.DIMMED;
                continue;
            }
            if (isCorrectGuess) {
                guessButton.className = ButtonState.CORRECT;
                currentItem.answeredCorrectly = true;
                correctButton = guessButton;
                continue;
            }
            wrongGuesses.push(guess);
            guessButton.className = ButtonState.WRONG;
        }
        return correctButton;
    }

    async function handleCorrectGuess() {

        const award = guessButtonCount - wrongGuesses.length - 1;

        await delay.scoreUpdate(award, correctButton!);
        const newScore = props.score + award;
        props.setScore(newScore);

        if (newScore > props.best) {
            props.setBest(newScore);
            localStorage.setItem("bestScore", newScore.toString());
        }

        await delay.resultPause();
        for (let guess = 0; guess < guessButtonCount; guess++) {
            const guessButton = guessButtons[guess].ref.current!;
            guessButton.className = ButtonState.HIDDEN;
        }

        hideElementRef(elements.imageSection);
        
        if (1 + currentItemIndex === quizItems.length) {
            const prompt = elements.questionHeading.current!;
            prompt.innerHTML = "[ play again ]";
            prompt.style.cursor = "pointer";
            prompt.onclick = () => {
                hideElementRef(elements.questionHeading);
                delay.showSpinner();
                window.location.reload();
            };
            setGameState(GameState.GAMEOVER);
            return;
        }

        hideElementRef(elements.questionHeading);
        setCurrentItemIndex(currentItemIndex + 1);
        wrongGuesses = [];
        setGameState(GameState.LOADING);
    }

    function unlockButtons() {
        for (let guess = 0; guess < guessButtonCount; guess++) {
            const ref = guessButtons[guess].ref.current!;
            switch (ref.className) {
                case ButtonState.DIMMED:
                    if (!wrongGuesses.includes(guess)) {
                        ref.className = ButtonState.NORMAL;
                    }
                    break;
                case ButtonState.WRONG:
                    ref.className = ButtonState.DIMMED;
                    break;
                default:
                    break;
            }
        }
    }
}
