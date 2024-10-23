import { FlowContext } from "../libs/flow-context/FlowContext";
import { currentQuizItem, QuizState } from "../models/QuizState";
import { LoadingSpinner } from "./LoadingSpinner";
import { EventName } from "../models/EventName";
import { createAnimation } from "./QuestionImage.animation";
import { createConfig } from "./QuestionImage.config";

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
        <section
            id={config.animationId}
            ref={config.ref}
            style={config.sectionStyle}>
            {jsx}
        </section>
    );
}

async function onPointerDown() {
    if (!config.enableSecretNextImage) {
        return;
    }

    const [state, setState] = FlowContext.current<QuizState>();
    if (state.eventName !== EventName.NextQuestion) {
        return;
    }

    const questionImage = QuestionImage.animation;
    const loadingSpinner = LoadingSpinner.animation;

    await questionImage.transitionOut();
    await loadingSpinner.transitionIn();

    ++state.currentItemIndex;
    if (state.currentItemIndex >= state.quizModule!.quizData.items.length) {
        state.currentItemIndex = 0;
    }
    setState({ ...state });
}

/////////////////////////////////////////////
QuestionImage.config = config;
QuestionImage.animation = animation;
/////////////////////////////////////////////
