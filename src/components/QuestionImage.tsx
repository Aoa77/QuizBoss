import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { createAnimation } from "./QuestionImage.animation";
import { createConfig } from "./QuestionImage.config";
import { EventName } from "../models/EventName";

/////////////////////////////////////////////
const config = createConfig();
const animation = createAnimation(config);
/////////////////////////////////////////////

export function QuestionImage() {
    const [state] = FlowContext.current<QuizState>();
    const item = state.currentItem;
    if (item === null) {
        return null;
    }

    return (
        <section id={config.id} ref={config.ref} style={config.sectionStyle}>
            <img
                src={item.imageSrc}
                style={config.imgStyle}
                alt=""
                onPointerDown={onPointerDown}
            />
        </section>
    );
}

async function onPointerDown() {
    const [state, setState] = FlowContext.current<QuizState>();
    if (!config.enableSecretInput || state.eventName !== EventName.AwaitGuess) {
        return;
    }
    setState({ ...state, eventName: EventName.ConcludeQuestion });
}

/////////////////////////////////////////////
QuestionImage.config = config;
QuestionImage.animation = animation;
/////////////////////////////////////////////
