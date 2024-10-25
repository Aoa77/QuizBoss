import { Duration } from "../libs/anime+/Constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";

export async function ConcludeQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();

    const anims = TaskGroup.create();
    const duration = Duration.oneSecond;
    anims.add(QuestionImage.animation.out({ duration }));
    anims.add(
        LoadingSpinner.animation.in({ delay: 0.45 * duration, duration })
    );
    await anims.all();


    setState({ ...state, eventName: EventName.PrepQuestion });
}
