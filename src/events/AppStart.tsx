import { LoadingSpinner } from "../components/LoadingSpinner";
import { Task } from "../libs/friendlies/Task";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

const config = {
    START_DELAY: 200,
};

export async function AppStart() {
    ///
    await Task.delay(config.START_DELAY);
    await LoadingSpinner.animation.transitionIn();

    ///
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        setState({ ...state, eventName: EventName.LoadQuizModule });
        return;
    }
    ///
    setState({ ...state, eventName: EventName.QuizStart });
}
