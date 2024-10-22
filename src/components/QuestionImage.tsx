import { FlowContext } from "../libs/flow-context/FlowContext";
import { currentQuizItem, QuizState } from "../models/QuizState";
import { LoadingSpinner } from "./LoadingSpinner";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { EventName } from "../models/EventName";
import { QuestionImageConfig } from "./QuestionImage.config";
import { QuestionImageAnimation } from "./QuestionImage.animation";

const config: QuestionImageConfig = {};
config.animationId = "QuestionImage";
config.fadeDuration = 500;
config.enableSecretNextImage = true;
config.sectionStyle = { ...LoadingSpinner.config.sectionStyle };
config.imgStyle = {
    height: CssUnit.cqh(LoadingSpinner.config.sectionHeight!),
};

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
        <section id={config.animationId} style={config.sectionStyle}>
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

    await questionImage.end();
    await loadingSpinner.begin();

    ++state.currentItemIndex;
    if (state.currentItemIndex >= state.quizModule!.quizData.items.length) {
        state.currentItemIndex = 0;
    }
    setState({ ...state });
}

QuestionImage.config = config;
QuestionImage.animation = new QuestionImageAnimation(config);
