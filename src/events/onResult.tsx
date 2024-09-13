import { AppContext, GameState } from "../app";
import { ButtonState } from "../elements";

var wrongGuesses: number[] = [];

///
export async function onResult(context: AppContext) {
    const { config, elements: elementController, states: stateController, time: timeController } = context;
    const { state, setState } = stateController;

    const { guessButtonCount } = config;
    if (state.quizModule === null) {
        return;
    }

    const { guessButtons } = elementController;
    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const correctAnswer = currentItem.key;
    const isCorrectGuess = correctAnswer === state.guessValue;

    const correctButton = await lockButtons();
    if (isCorrectGuess || wrongGuessesExauhsted()) {
        await handleCorrectGuess();
        setState({ ...state });
        return;
    }

    await timeController.resultPause();
    unlockButtons();
    setState({ ...state, gameState: GameState.INPUT });
    return;

    function resetWrongGuesses(): void {
        wrongGuesses = [];
    }
    function wrongGuessesExauhsted(): boolean {
        return wrongGuesses.length === guessButtonCount - 1;
    }

    async function lockButtons(): Promise<HTMLButtonElement | null> {
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
                correctButton = guessButton;
                correctButton.className = ButtonState.CORRECT;
                currentItem.answeredCorrectly = true;
                continue;
            }
            wrongGuesses.push(guess);
            guessButton.className = ButtonState.WRONG;
            if (wrongGuessesExauhsted()) {
                await revealCorrectAnswer();
                break;
            }
        }
        return correctButton;

        async function revealCorrectAnswer() {
            await timeController.resultPause();
            unlockButtons();

            for (let i = 0; i < guessButtonCount; i++) {
                if (wrongGuesses.includes(i)) {
                    continue;
                }
                correctButton = guessButtons[i].ref.current!;
                await elementController.blinkButton(correctButton);
                currentItem.answeredCorrectly = true;
                break;
            }
        }
    }

    async function handleCorrectGuess() {
        // elementController.refs.imageSection.current!.classList.add("fadeOut");
        // elementController.hideQuestionHeading();
        // elementController.showSpinner();

        const award = guessButtonCount - wrongGuesses.length - 1;
        await applyScoreAward(award);

        for (let guess = 0; guess < guessButtonCount; guess++) {
            const guessButton = guessButtons[guess].ref.current!;
            guessButton.className = ButtonState.HIDDEN;
        }

        elementController.hideImageSection();
        elementController.refs.imageSection.current!.classList.remove("fadeOut");

        if (1 + state.currentItemIndex === quizItems.length) {
            const prompt = elementController.refs.questionHeading.current!;
            prompt.innerHTML = "[ play again ]";
            prompt.style.cursor = "pointer";
            prompt.onclick = () => {
                elementController.hideQuestionHeading();
                elementController.showSpinner();
                window.location.reload();
            };
            state.gameState = GameState.GAMEOVER;
            return;
        }

        elementController.hideQuestionHeading();
        ++state.currentItemIndex;
        resetWrongGuesses();
        state.gameState = GameState.LOADING;
    }

    async function applyScoreAward(award: number) {
        if (award === 0) {
            return;
        }
        await elementController.scoreUpdate(award, correctButton!);
        state.score += award;
        if (state.score > state.best) {
            state.best = state.score;
            localStorage.setItem("bestScore", state.best.toString());
        }
        await timeController.resultPause();
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
