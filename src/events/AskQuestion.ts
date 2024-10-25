import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { Duration } from "../libs/anime+/Constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { Task, TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";


export async function AskQuestion() {

    const [state, setState] = FlowContext.current<QuizState>();

    await Task.delay(Duration.oneSecond);
    const anims = TaskGroup.create();
    const duration = Duration.oneSecond;
    anims.add(LoadingSpinner.animation.out({ duration }));
    anims.add(QuestionImage.animation.in({ delay: 0.5 * duration, duration }));
    await anims.all();


    setState({ ...state, eventName: EventName.AwaitInput });
}
