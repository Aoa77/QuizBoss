import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuestionImage } from "../components/QuestionImage";
import { Duration } from "../libs/anime+/Constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function AskQuestion() {
    const [state, setState] = FlowContext.current<QuizState>();

    const duration = Duration.oneSecond;
    const anims = TaskGroup.create();
    anims.add(LoadingSpinner.animation.out({ delay: duration, duration }));
    anims.add(QuestionImage.animation.in({ delay: 0.5 * duration, duration }));
    await anims.all();

    setState({ ...state, eventName: EventName.AwaitGuess });
}
