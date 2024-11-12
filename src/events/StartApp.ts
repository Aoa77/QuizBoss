import { Anim } from "../code/Animation";
import { AppContext } from "../app/context";
import { EventName } from "../code/EventName";
import { $time } from "../libs/anime-context/constants";
import { Task } from "../libs/friendlies/Task";

export async function StartApp() {
    //
    const { state, flow } = AppContext.current(EventName.StartApp);
    const { quizModule } = state;

    //
    Anim.LoadingSpinner.immediate({ opacity: 1 });
    await Task.delay($time.milliseconds(3));

    //
    flow.dispatch((state) => ({
        ...state,
        eventName: quizModule ? EventName.StartQuiz : EventName.LoadQuizModule,
    }));
}
