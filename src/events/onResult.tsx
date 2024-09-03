import { AppProps, hideElementRef } from "../props";
import { GameState, ButtonState } from "../enums";

///
var wrongGuesses: number[] = [];

///
export async function onResult(props: AppProps) {
    const { config, delay, elements, guessButtons, state, setState } = props;

    const { guessButtonCount } = config;
    if (state.quizModule === null) {
        return;
    }

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const correctAnswer = currentItem.key;
    const isCorrectGuess = correctAnswer === state.guessValue;

    const correctButton = lockButtons();
    if (isCorrectGuess) {
        await handleCorrectGuess();
        setState({ ...state });
        return;
    }

    await delay.resultPause();
    unlockButtons();
    setState({ ...state, gameState: GameState.INPUT });
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
            if (state.guessValue !== guessButton.value) {
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
        state.score += award;

        if (state.score > state.best) {
            state.best = state.score;
            localStorage.setItem("bestScore", state.best.toString());
        }

        await delay.resultPause();
        for (let guess = 0; guess < guessButtonCount; guess++) {
            const guessButton = guessButtons[guess].ref.current!;
            guessButton.className = ButtonState.HIDDEN;
        }

        hideElementRef(elements.imageSection);

        if (1 + state.currentItemIndex === quizItems.length) {
            const prompt = elements.questionHeading.current!;
            prompt.innerHTML = "[ play again ]";
            prompt.style.cursor = "pointer";
            prompt.onclick = () => {
                hideElementRef(elements.questionHeading);
                delay.showSpinner();
                window.location.reload();
            };
            state.gameState = GameState.GAMEOVER;
            return;
        }

        hideElementRef(elements.questionHeading);
        ++state.currentItemIndex;
        wrongGuesses = [];
        state.gameState = GameState.LOADING;
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
