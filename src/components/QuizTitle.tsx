import { useMemo } from "react";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { createAnimation } from "./QuizTitle.animation";
import { useStyle } from "./QuizTitle.style";

/////////////////////////////////////////////
const animation = createAnimation();
/////////////////////////////////////////////

export function QuizTitle() {
    const style = useMemo(useStyle, []);

    const [state] = FlowContext.current<QuizState>();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { title } = quizData;
    
    return (
        <section
            id={animation.id}
            ref={animation.ref}
            style={style.section}
            onPointerDown={onPointerDown}>
            {title}
        </section>
    );
}

function onPointerDown() {
    const [state] = FlowContext.current<QuizState>();
    const { settings } = state;
    const { enableSecretWindowReload } = settings;
    if (!enableSecretWindowReload) {
        return;
    }
    window.location.reload();
}

/////////////////////////////////////////////
QuizTitle.animation = animation;
/////////////////////////////////////////////
