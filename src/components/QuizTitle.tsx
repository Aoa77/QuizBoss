import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { createConfig } from "./QuizTitle.config";
import { createAnimation } from "./LoadingSpinner.animation";

/////////////////////////////////////////////
const config = createConfig();
const animation = createAnimation(config);
/////////////////////////////////////////////

export function QuizTitle() {
    const [state] = FlowContext.current<QuizState>();

    return (
        <section
            id={config.animationId}
            ref={config.ref}
            style={config.sectionStyle}
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
