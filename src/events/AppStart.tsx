import { LoadingSpinner } from "../components/LoadingSpinner";
import { Task } from "../libs/csharp-sim/Task";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

const config = {
    START_DELAY: 1000,
};

export async function AppStart() {
    ///
    await Task.delay(config.START_DELAY);
    const loadingSpinner = LoadingSpinner.animation;
    console.info("1");
    await loadingSpinner.begin();
    console.info("2");

    ///
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        setState({ ...state, eventName: EventName.LoadQuizModule });
        return;
    }
    ///
    setState({ ...state, eventName: EventName.QuizStart });
}
