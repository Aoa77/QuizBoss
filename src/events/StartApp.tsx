import { FlowContext } from "../libs/flow-context/FlowContext";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { LoadingProgress } from "../components/LoadingProgress";
import { Duration } from "../libs/anime+/Constants";

export async function StartApp() {
    ///
    const duration = Duration.oneSecond;
    await LoadingProgress.animation.in({ delay: 0.2 * duration, duration });

    ///
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        setState({ ...state, eventName: EventName.LoadQuizModule });
        return;
    }
    ///
    setState({ ...state, eventName: EventName.StartQuiz });
}
