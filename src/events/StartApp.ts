import { FlowContext } from "../libs/flow-context/FlowContext";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { Duration, Fade } from "../libs/anime-context/AnimeContext.constants";
import { Anime } from "../models/Anime";

export async function StartApp() {
    ///
    const duration = Duration.oneSecond;
    Anime.LoadingProgress.run({
        opacity: Fade.max,
        delay: 0.2 * duration,
        duration,
    });

    ///
    const [state, setState] = FlowContext.current<QuizState>();
    if (state.quizModule === null) {
        setState({ ...state, eventName: EventName.LoadQuizModule });
        return;
    }
    ///
    setState({ ...state, eventName: EventName.StartQuiz });
}
