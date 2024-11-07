import { assertFlowEvent, EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";
import { Ease, Fade } from "../libs/anime-context/AnimeContext.constants";
import { Anime } from "../models/Anime";
import { FlowContext } from "../libs/flow-context/FlowContext";

export async function StartApp() {
    ///
    assertFlowEvent(EventName.StartApp);
    
    ///
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings, quizModule } = state;
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
    setState((state) => ({
        ...state,
        eventName: quizModule ? EventName.StartQuiz : EventName.LoadQuizModule,
    }));
}
