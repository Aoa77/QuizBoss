//import { Anime } from "../code/Anime";
import { AppContext } from "../app/App.context";
import { EventName } from "../code/EventName";
//import { $ease, $time } from "../libs/anime-context/AnimeConstants";

export async function StartApp() {
    ///
    const { state, flow } = AppContext.current(EventName.StartApp);
    const { quizModule } = state;

    ///
    // await Anime.LoadingProgress.run({
    //     opacity: [0, 1],
    //     delay: $time.ticks(0.25),
    //     duration: $time.tick,
    //     easing: $ease.linear,
    // });

    ///
    flow.dispatch((state) => ({
        ...state,
        eventName: quizModule ? EventName.StartQuiz : EventName.LoadQuizModule,
    }));
}
