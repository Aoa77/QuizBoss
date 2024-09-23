import pushGuessButton from "../functions/pushGuessButton";
import { ButtonState } from "../models/ButtonState";
import { ElementNames } from "../elements/constants";
import { useXrefButtons } from "../../core/xrefs/buttons";

export default function GuessButton(params: { index: number }) {
    const [button] = useXrefButtons(`${ElementNames.button}_${params.index}`);

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
