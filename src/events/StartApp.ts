import { Animation } from "../code/Animation";
import { AppContext } from "../app/context";
import { EventName } from "../code/EventName";
import { $time } from "../libs/anime-context/AnimeConstants";
import { Task } from "../libs/friendlies/Task";

export async function StartApp() {
    //
    const { state, flow } = AppContext.current(EventName.StartApp);
    const { quizModule } = state;

    //
    Animation.LoadingSpinner.opacity = 1;
    await Task.delay($time.seconds(3));

    //
    flow.dispatch((state) => ({
        ...state,
        eventName: quizModule ? EventName.StartQuiz : EventName.LoadQuizModule,
    }));
}
