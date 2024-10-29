import { LoadingProgress } from "../components/LoadingProgress";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuizTitle } from "../components/QuizTitle";
import { Duration } from "../libs/anime-context/AnimeContext.constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function StartQuiz() {
    //
    const duration = Duration.oneSecond;
    const anims = TaskGroup.create();
    anims.add(
        LoadingProgress.animation.out({
            delay: 0,
            duration,
            enable: true,
        }),
    );
    anims.add(
        QuizTitle.animation.in({
            delay: 0.5 * duration,
            duration,
            enable: true,
        }),
    );
    anims.add(
        LoadingSpinner.animation.in({
            delay: 0.75 * duration,
            duration,
            enable: true,
        }),
    );
    await anims.all();

    //
    const [state, setState] = FlowContext.current<QuizState>();
    setState({ ...state, eventName: EventName.PrepQuestion });
}
