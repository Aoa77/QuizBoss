import { useRef } from "react";
import { ButtonState } from "../enums";
import ButtonElement from "./ButtonElement";

export default function ButtonElementRef(
    index: number,
    onPointerDown: (ref: React.RefObject<HTMLButtonElement>) => void): ButtonElement {
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
