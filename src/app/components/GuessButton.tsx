import pushGuessButton from "../functions/pushGuessButton";
import { ButtonState } from "../models/ButtonState";
import { ELEMENT } from "../elements/constants";
import { useXrefButtons } from "../../core/elements/buttons";

export default function GuessButton(params: { index: number }) {
    const [button] = useXrefButtons(`${ELEMENT.button}_${params.index}`);

    return (
        <button
            className={ButtonState.HIDDEN}
            id={button!.id}
            key={button!.id}
            onPointerDown={() => pushGuessButton(button)}
            ref={button!.ref}
            value={button!.id}>
            {button!.id}
        </button>
    );
}
