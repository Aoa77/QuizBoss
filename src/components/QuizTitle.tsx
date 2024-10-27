import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { createAnimation } from "./QuizTitle.animation";
import { useStyle } from "./QuizTitle.style";

/////////////////////////////////////////////
const animation = createAnimation();
/////////////////////////////////////////////

export function QuizTitle() {
    const style = useStyle();
    const [state] = FlowContext.current<QuizState>();

    return (
        <section
            id={animation.id}
            ref={animation.ref}
            style={style.section}
            onPointerDown={onPointerDown}>
            {state.quizModule?.quizData.title}
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
