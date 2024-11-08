import { assertFlowEvent, EventName } from "../code/EventName";
import { QuizState } from "../code/QuizState";
import { $ease, $time } from "../libs/anime-context/AnimeContext.constants";
import { Anime } from "../code/Anime";
import { FlowContext } from "../libs/flow-context/FlowContext";

export async function StartApp() {
    ///
    assertFlowEvent(EventName.StartApp);

    ///
    const [state, setState] = FlowContext.current<QuizState>();
    const { quizModule } = state;

    ///
    await Anime.LoadingProgress.run({
        opacity: [0, 1],
        delay: $time.ticks(0.25),
        duration: $time.tick,
        easing: $ease.linear,
    });

    ///
    setState((state) => ({
        ...state,
        eventName: quizModule ? EventName.StartQuiz : EventName.LoadQuizModule,
    }));
}
