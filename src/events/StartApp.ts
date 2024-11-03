import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { Ease, Fade } from "../libs/anime-context/AnimeContext.constants";
import { Anime } from "../models/Anime";
import { FlowContext } from "../libs/flow-context/FlowContext";

export async function StartApp() {
    const [state, setState] = FlowContext.current<QuizState>();
    ///
    const { settings } = state;
    const { oneTickAtSpeed } = settings;
    ///
    const duration = oneTickAtSpeed;
    await Anime.LoadingProgress.run({
        opacity: Fade.in,
        delay: 0.2 * duration,
        duration,
        easing: Ease.linear,
    });

    ///
    if (state.quizModule === null) {
        setState({ ...state, eventName: EventName.LoadQuizModule });
        return;
    }
    ///
    setState({ ...state, eventName: EventName.StartQuiz });
}
