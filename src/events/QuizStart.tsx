import { LoadingProgress } from "../components/LoadingProgress";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuizTitle } from "../components/QuizTitle";
import { Duration } from "../libs/anime+/Constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function QuizStart() {
    //
    const anims = TaskGroup.create();
    const duration = Duration.oneSecond;
    anims.add(LoadingProgress.animation.out({ duration }));
    anims.add(QuizTitle.animation.in({ delay: 0.5 * duration, duration }));
    anims.add(
        LoadingSpinner.animation.in({ delay: 0.75 * duration, duration }),
    );
    await anims.all();

    //
    const [state, setState] = FlowContext.current<QuizState>();
    setState({ ...state, eventName: EventName.PrepQuestion });
}
