import { FlowContext } from "../libs/flow-context/FlowContext";
import { QuizState } from "../models/QuizState";
import { createAnimation } from "./QuestionText.animation";
import { useStyle } from "./QuestionText.style";

/////////////////////////////////////////////
const animation = createAnimation();
/////////////////////////////////////////////

export function QuestionText() {
    const style = useStyle();
    const [state] = FlowContext.current<QuizState>();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { questionText } = quizData;

    return (
        <section id={animation.id} ref={animation.ref} style={style.section}>
            {questionText}
        </section>
    );
}

/////////////////////////////////////////////
QuestionText.animation = animation;
/////////////////////////////////////////////
