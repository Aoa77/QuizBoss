import { Config, ButtonElement } from "../props";
import { GameState, ButtonState } from "../enums";
import { useRef } from "react";

export default function useButtonBuilder(
    config: Config,
    gameState: GameState,
    setGameState: (gameState: GameState) => void,
    setGuessValue: (guessValue: string) => void,
): ButtonElement[] {
    ///
    const { guessButtonCount } = config;

    const onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void = (
        clickedButtonRef,
    ) => {
        if (gameState !== GameState.INPUT) {
            return;
        }
        const clickedButton = clickedButtonRef.current!;
        if (clickedButton.className !== ButtonState.NORMAL) {
            return;
        }
        setGuessValue(clickedButton.value);
        setGameState(GameState.RESULT);
    };

    const buttons: ButtonElement[] = [];
    for (let i = 0; i < guessButtonCount; i++) {
        buttons.push(NewButtonElement(i, onPointerDown));
    }
    return buttons;
}

function NewButtonElement(
    index: number,
    onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void,
): ButtonElement {
    const ref = useRef(null);
    const key = "button" + index;
    return {
        element: (
            <button
                className={ButtonState.HIDDEN}
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
