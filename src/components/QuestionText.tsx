import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { createAnimation } from "./QuestionText.animation";
import { createConfig } from "./QuestionText.config";

/////////////////////////////////////////////
const config = createConfig();
const animation = createAnimation(config);
/////////////////////////////////////////////

export function QuestionText() {
    const [state] = FlowContext.current<QuizState>();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { questionText } = quizData;

    return (
        <section id={config.id} ref={config.ref} style={config.style}>
            {questionText}
        </section>
    );
}

/////////////////////////////////////////////
QuestionText.config = config;
QuestionText.animation = animation;
/////////////////////////////////////////////
