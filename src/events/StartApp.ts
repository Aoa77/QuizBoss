import { Anim } from "../code/Animation";
import { AppContext } from "../app/context";
import { EventName } from "../code/EventName";
import { $ease, $time } from "../libs/anime-context/constants";
import { Task } from "../libs/friendlies/Task";
import anime from "animejs";

export async function StartApp() {
    //
    const { state, flow } = AppContext.current(EventName.StartApp);
    const { quizModule } = state;

    //
    Anim.LoadingSpinner.immediate({ opacity: 0, scale: 0 });
    Anim.AppTitle.immediate({ opacity: 1, scale: 1 });

    ///
    anime({
        targets: "#app-loader",
        opacity: [1, 0],
        duration: $time.ticks(2),
        easing: $ease.linear,
    }).finished.then(() => {
        document.getElementById("app-loader")!.style.display = "none";
    });

    //
    await Task.delay($time.ticks(4));

    //
    flow.dispatch((state) => ({
        ...state,
        eventName: quizModule ? EventName.StartQuiz : EventName.LoadQuizModule,
    }));
}
