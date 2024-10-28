import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { createAnimation } from "./QuestionImage.animation";
import { EventName } from "../models/EventName";
import { useStyle } from "./QuestionImage.style";
import { useMemo } from "react";

/////////////////////////////////////////////
const animation = createAnimation();
/////////////////////////////////////////////

export function QuestionImage() {
    const style = useMemo(useStyle, []);
    const [state] = FlowContext.current<QuizState>();
    const item = state.currentItem;
    if (item === null) {
        return null;
    }

    return (
        <section id={animation.id} ref={animation.ref} style={style.section}>
            <img
                src={item.imageSrc}
                style={style.image}
                alt=""
                onPointerDown={onPointerDown}
            />
        </section>
    );
}

async function onPointerDown() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { enableSecretQuestionSkip } = settings;
    if (!enableSecretQuestionSkip || state.eventName !== EventName.AwaitGuess) {
        return;
    }
    setState({ ...state, eventName: EventName.ConcludeQuestion });
}

/////////////////////////////////////////////
QuestionImage.animation = animation;
/////////////////////////////////////////////
