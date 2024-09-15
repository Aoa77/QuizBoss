import { AppContext } from "../app";
import { ButtonElement, ButtonState } from "../buttons";
import { GameState } from "../state";
import { delay, Duration, Multiplier } from "../time";

var wrongGuesses: number[] = [];

///
export async function onResult(context: AppContext) {
    const { config, elements, states } = context;
    const { state, setState } = states;
    if (state.quizModule === null) {
        return;
    }

    const { guessButtonCount } = config;
    const { refs, guessButtons } = elements;
    const { buttonArea, image, loading, question } = refs;

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    const correctAnswer = currentItem.key;
    const isCorrectGuess = correctAnswer === state.guessValue;

    const correctButton: ButtonElement | null = await lockButtons();
    const correctButtonRef: HTMLButtonElement | null | undefined =
        correctButton?.ref.current;

    if (isCorrectGuess || wrongGuessesExauhsted()) {
        ///
        await handleCorrectGuess();
        if (1 + state.currentItemIndex === quizItems.length) {
            setState({ ...state, gameState: GameState.GAMEOVER });
            return;
        }

        ///
        ++state.currentItemIndex;
        resetWrongGuesses();
        setState({ ...state, gameState: GameState.LOADING });
        return;
    }

    ///
    await handleWrongGuess();
    await unlockButtons();
    setState({ ...state, gameState: GameState.INPUT });
    return;

    function resetWrongGuesses(): void {
        wrongGuesses = [];
    }
    function wrongGuessesExauhsted(): boolean {
        return wrongGuesses.length === guessButtonCount - 1;
    }

    async function lockButtons(): Promise<ButtonElement | null> {
        let correctButton: ButtonElement | null = null;
        let correctButtonRef: HTMLButtonElement | null = null;

        for (let guess = 0; guess < guessButtonCount; guess++) {
            //
            const guessButton = guessButtons[guess];
            const guessButtonRef = guessButton.ref.current!;

            if (guessButtonRef.className === ButtonState.DISABLED) {
                continue;
            }
            if (guessButtonRef.className === ButtonState.HIDDEN) {
                continue;
            }
            if (state.guessValue !== guessButtonRef.value) {
                guessButtonRef.className = ButtonState.DIMMED;
                continue;
            }

            if (isCorrectGuess) {
                correctButton = guessButton;
                correctButtonRef = correctButton.ref.current!;
                correctButtonRef.className = ButtonState.CORRECT;
                currentItem.answeredCorrectly = true;
                continue;
            }

            wrongGuesses.push(guess);
            guessButtonRef.className = ButtonState.WRONG;

            if (wrongGuessesExauhsted()) {
                await revealCorrectAnswer();
                break;
            }
        }
        return correctButton;

        async function revealCorrectAnswer() {
            // await delay({ });
            unlockButtons();

            for (let i = 0; i < guessButtonCount; i++) {
                if (wrongGuesses.includes(i)) {
                    continue;
                }
                const guessButton = guessButtons[i];
                correctButton = guessButton;
                correctButtonRef = correctButton.ref.current!;
                await elements.blinkButton(correctButtonRef);
                currentItem.answeredCorrectly = true;
                break;
            }
        }
    }

    async function handleCorrectGuess() {
        //
        if (!correctButton) {
            throw new Error("correctButton is null.");
        }

        const wrongButtons = guessButtons.filter(
            (b) => b.target !== correctButton.target,
        );

        await elements.scaleIn(correctButton.target);
        await delay(Duration.WAIT);

        elements.fadeOut(question.target);
        for (let button of wrongButtons) {
            await elements.fadeOut(button.target);
        }

        await delay(Duration.WAIT, Multiplier.x3);
        elements.scaleOut(correctButton.target);
        await delay(Duration.WAIT);
        
        elements.fadeOut(image.target);
        await elements.fadeIn(loading.target);

        await elements.fadeOut(correctButton.target);
        await delay(Duration.WAIT);
    }

    async function applyScoreAward(award: number) {
        if (!correctButtonRef) {
            throw new Error("correctButtonRef is null.");
        }

        if (award === 0) {
            return;
        }

        state.score = await elements.scoreUpdate(
            state.score,
            award,
            correctButtonRef,
        );

        if (state.score > state.best) {
            state.best = state.score;
            localStorage.setItem("bestScore", state.best.toString());
        }
        // await delay();
    }

    async function handleWrongGuess() {
        const wrongButton: ButtonElement = guessButtons.find(
            (b) => b.ref.current!.className === ButtonState.WRONG,
        )!;

        await elements.scaleIn(wrongButton.target);
        await delay(Duration.WAIT);
        elements.scaleOut(wrongButton.target);
    }

    async function unlockButtons() {
        await delay(Duration.TICK);
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
