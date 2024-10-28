import { useMemo } from "react";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { createAnimation, GuessButtonsAnimation } from "./GuessButtons.animation";
import { useStyle } from "./GuessButtons.style";
import { ButtonStyle } from "../models/ButtonStyle";

///////////////////////////////////////////////////
const animations: GuessButtonsAnimation[] = [];
///////////////////////////////////////////////////

export function GuessButtons() {
    const style = useMemo(useStyle, []);
    const [state] = FlowContext.current<QuizState>();
    const { buttonAnswerMap, settings } = state;
    const { guessButtonCount } = settings;
    const buttonJsx = [];

    for (let bidx = 0; bidx < guessButtonCount; bidx++) {
        const anim = createAnimation(bidx);
        animations.push(anim);

        const item = buttonAnswerMap[bidx];
        if (!item) {
            continue;
        }

        const buttonText = item.name;
        const buttonStyle = {
            ...style.span, //////////
            ...style.button.get(item.buttonStyle),
        };

        buttonJsx.push(
            <span
                id={anim.id}
                key={anim.id}
                ref={anim.ref}
                style={buttonStyle}
                onPointerDown={() => onPointerDown(bidx)}>
                {buttonText}
            </span>,
        );
    }

    return <section style={style.section}>{buttonJsx}</section>;
}

async function onPointerDown(bidx: number) {
    //const animation = animations[bidx];
    //await animation.borderGlow();

    const [state, setState] = FlowContext.current<QuizState>();
    const { buttonAnswerMap, eventName } = state;
    if (eventName !== EventName.AwaitGuess) {
        return;
    }
    if (buttonAnswerMap[bidx]!.buttonStyle !== ButtonStyle.normal) {
        return;
    }

    state.guessButtonIndex = bidx;
    setState({ ...state, eventName: EventName.PrepGuessResult });
}

/////////////////////////////////////////////
GuessButtons.animations = animations;
/////////////////////////////////////////////
