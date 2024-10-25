import { LoadingProgress } from "../components/LoadingProgress";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuizTitle } from "../components/QuizTitle";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Task, TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function QuizStart() {
    //
    const anims = TaskGroup.create();
    anims.add(
        LoadingProgress.animation
            .out()
            .then(() => LoadingSpinner.animation.in()),
    );
    anims.add(
        Task.delay(LoadingProgress.config.transitionDuration / 2) //////
            .then(() => QuizTitle.animation.in()),
    );
    await anims.all();

    //
    const [state, setState] = FlowContext.current<QuizState>();
    setState({ ...state, eventName: EventName.PrepQuestion });
}
