import { AppContext, GameState } from "../app";
import { ButtonState } from "../buttons";

var wrongGuesses: number[] = [];

///
export async function onResult(context: AppContext) {
    const { config, elements, states, time } = context;
    const { state, setState } = states;

    const { guessButtonCount } = config;
    if (state.quizModule === null) {
        return;
    }

    const { guessButtons } = elements;
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

    await time.pause();
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
                correctButton!.className = ButtonState.CORRECT;
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
            await time.pause();
            unlockButtons();

            for (let i = 0; i < guessButtonCount; i++) {
                if (wrongGuesses.includes(i)) {
                    continue;
                }
                correctButton = guessButtons[i].ref.current!;
                await elements.blinkButton(correctButton);
                currentItem.answeredCorrectly = true;
                break;
            }
        }
    }

    async function handleCorrectGuess() {
        // elements.refs.imageSection.current!.classList.add("fadeOut");
        // elements.hideQuestionHeading();
        // elements.showSpinner();

        const award = guessButtonCount - wrongGuesses.length - 1;
        await applyScoreAward(award);

        for (let guess = 0; guess < guessButtonCount; guess++) {
            const guessButton = guessButtons[guess].ref.current!;
            guessButton.className = ButtonState.HIDDEN;
        }

        elements.hideImage();
        // elements.refs.imageSection.current!.classList.remove("fadeOut");

        if (1 + state.currentItemIndex === quizItems.length) {
            onGameOver();
            return;
        }

        elements.hideQuestion();
        ++state.currentItemIndex;
        resetWrongGuesses();
        state.gameState = GameState.LOADING;
    }

    function onGameOver() {
        const prompt = elements.refs.question.current!;
        prompt.innerHTML = "[ play again ]";
        prompt.classList.add("prompt");
        prompt.onclick = async () => {
            //
            elements.hideTitle();
            elements.hideButtonsSection();
            elements.hideScoreArea();
            elements.hideProgressSection();
            elements.hideQuestion();
            elements.hideAppVersion();
            //
            elements.animate.loading.fadeIn();
            window.location.reload();
        };
        state.gameState = GameState.GAMEOVER;
    }

    async function applyScoreAward(award: number) {
        if (award === 0) {
            return;
        }

        state.score = await elements.scoreUpdate(
            state.score,
            award,
            correctButton!,
        );
        if (state.score > state.best) {
            state.best = state.score;
            localStorage.setItem("bestScore", state.best.toString());
        }
        await time.pause();
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
