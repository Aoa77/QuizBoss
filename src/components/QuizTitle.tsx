import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { createAnimation } from "./QuizTitle.animation";
import { createConfig } from "./QuizTitle.config";

/////////////////////////////////////////////
const config = createConfig();
const animation = createAnimation(config);
/////////////////////////////////////////////

export function QuizTitle() {
    const [state] = FlowContext.current<QuizState>();

    return (
        <section
            id={config.id}
            ref={config.ref}
            style={config.style}
            onPointerDown={onPointerDown}>
            {state.quizModule?.quizData.title}
        </section>
    );
}

async function onPointerDown() {
    if (config.enableSecretReload) {
        window.location.reload();
        return;
    }
}

/////////////////////////////////////////////
QuizTitle.config = config;
QuizTitle.animation = animation;
/////////////////////////////////////////////
