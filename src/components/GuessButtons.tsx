import { useMemo } from "react";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { createAnimation, GuessButtonsAnimation } from "./GuessButtons.animation";
import { useStyle } from "./GuessButtons.style";

///////////////////////////////////////////////////
const animations: GuessButtonsAnimation[] = [];
///////////////////////////////////////////////////

export function GuessButtons() {
    const style = useMemo(useStyle, []);
    const [state] = FlowContext.current<QuizState>();
    const guessButtonCount = state.settings.guessButtonCount;
    const buttonAnswerMap = state.buttonAnswerMap;
    const buttonJsx = [];

    for (let bidx = 0; bidx < guessButtonCount; bidx++) {
        const anim = createAnimation(bidx);
        animations.push(anim);

        const item = buttonAnswerMap[bidx];
        const text = item === null ? null : item.name;

        buttonJsx.push(
            <span
                id={anim.id}
                key={anim.id}
                ref={anim.ref}
                style={style.span}
                onPointerDown={() => onPointerDown(bidx)}>
                {text}
            </span>,
        );
    }

    return <section style={style.section}>{buttonJsx}</section>;
}

async function onPointerDown(buttonIndex: number) {
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.eventName !== EventName.AwaitGuess) {
        return;
    }
    state.guessButtonIndex = buttonIndex;
    setState({ ...state, eventName: EventName.ShowGuessResult });
}

/////////////////////////////////////////////
GuessButtons.animations = animations;
/////////////////////////////////////////////
