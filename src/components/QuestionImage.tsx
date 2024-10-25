import { FlowContext } from "../libs/flow-context/FlowContext";
import { currentQuizItem, QuizState } from "../models/QuizState";
import { createAnimation } from "./QuestionImage.animation";
import { createConfig } from "./QuestionImage.config";
import { EventName } from "../models/EventName";

/////////////////////////////////////////////
const config = createConfig();
const animation = createAnimation(config);
/////////////////////////////////////////////

export function QuestionImage() {
    const [state] = FlowContext.current<QuizState>();
    let jsx: JSX.Element | null = null;

    const item = currentQuizItem(state);
    if (item !== null) {
        jsx = (
            <img
                src={item.imageSrc}
                style={config.imgStyle}
                alt=""
                onPointerDown={onPointerDown}
            />
        );
    }

    return (
        <section id={config.id} ref={config.ref} style={config.sectionStyle}>
            {jsx}
        </section>
    );
}

async function onPointerDown() {
    const [state, setState] = FlowContext.current<QuizState>();
    if (!config.enableSecretInput || state.eventName !== EventName.AwaitInput) {
        return;
    }
    setState({ ...state, eventName: EventName.ConcludeQuestion });
}

/////////////////////////////////////////////
QuestionImage.config = config;
QuestionImage.animation = animation;
/////////////////////////////////////////////
