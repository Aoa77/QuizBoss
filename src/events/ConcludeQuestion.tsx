import { Duration } from "../libs/anime+/Constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";

export async function ConcludeQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();

    const duration = Duration.oneSecond;
    const anims = TaskGroup.create();
    anims.add(
        QuestionImage.animation.out({
            delay: 0,
            duration,
            enable: true,
        }),
    );
    anims.add(
        LoadingSpinner.animation.in({
            delay: 0.45 * duration,
            duration,
            enable: true,
        }),
    );
    await anims.all();

    setState({ ...state, eventName: EventName.PrepQuestion });
}
