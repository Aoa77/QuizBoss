import { Config } from "./Config";
import { Context } from "./Context";
import { GameState } from "./GameState";
import { useRef } from "react";

export function GuessButtons(context: Context) {
    const { elements, guessButtons } = context;
    return (
        <section ref={elements.buttons} className="buttons hidden">
            {guessButtons.map((b) => b.element)}
        </section>
    );
}

export enum GuessButtonState {
    CORRECT = "correct",
    DIMMED = "dimmed",
    DISABLED = "disabled",
    HIDDEN = "hidden",
    NORMAL = "normal",
    WRONG = "wrong",
}

export interface GuessButton {
    element: JSX.Element;
    ref: React.RefObject<HTMLButtonElement>;
}

export function useGuessButtons(
    config: Config,
    gameState: GameState,
    setGameState: (gameState: GameState) => void,
    setGuessValue: (guessValue: string) => void,
): GuessButton[] {
    ///
    const { guessButtonCount } = config;

    const onPointerDown: (
        ref: React.RefObject<HTMLButtonElement>, //////
    ) => void = (clickedButtonRef) => {
        if (gameState !== GameState.INPUT) {
            return;
        }
        const clickedButton = clickedButtonRef.current!;
        if (clickedButton.className !== GuessButtonState.NORMAL) {
            return;
        }
        setGuessValue(clickedButton.value);
        setGameState(GameState.RESULT);
    };

    const buttons: GuessButton[] = [];
    for (let i = 0; i < guessButtonCount; i++) {
        buttons.push(GuessButtonFactory(i, onPointerDown));
    }
    return buttons;
}

function GuessButtonFactory(
    index: number,
    onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void,
): GuessButton {
    const ref = useRef(null);
    const key = "button" + index;
    return {
        element: (
            <button
                className={GuessButtonState.NORMAL}
                id={key}
                key={key}
                onPointerDown={() => onPointerDown(ref)}
                ref={ref}
                value={key}
            >
                {key}
            </button>
        ),
        ref,
    };
}
