import { useRef } from "react";
import { Config } from "./Config";

export enum GuessButtonState {
    NORMAL = "normal",
    DIMMED = "dimmed",
    CORRECT = "correct",
    WRONG = "wrong",
}

export interface GuessButton {
    element: JSX.Element;
    ref: React.RefObject<HTMLButtonElement>;
}

export function useGuessButtons(
    config: Config,
    onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void,
): GuessButton[] {
    const { guessButtonCount } = config;
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
            ></button>
        ),
        ref,
    };
}
