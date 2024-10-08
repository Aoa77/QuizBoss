import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { fadeIn, fadeOut } from "../../../core/animation/fade";
import { ELEMENT } from "../../animation/elements";
import { xref } from "../../../core/animation/dom/xref";
import { initQuizModule } from "./initQuizModule";
import { initBestScore } from "./initBestScore";
import { LOADING } from "../../constants/TIME";
import { wait } from "../../../core/animation/wait";

export async function onQuizStart() {
    const [state] = flow<QuizState>();
    const [loading, image] = xref.divs(ELEMENT.loading, ELEMENT.image);

    if (state.quizModule === null) {
        loading.runAnimation(fadeIn());
        return;
    }
    // await wait(PAUSE.NORMAL);

    const quizItems = state.quizModule.quizData.items;
    const currentItem = quizItems[state.currentItemIndex];
    while (!currentItem || !currentItem.isLoaded) {
        await wait(LOADING.POLL);
    }

    loading.runAnimation(fadeOut());
    image.runAnimation(fadeIn());

    state.best = initBestScore(state);

    await loading.runAnimation(fadeIn());
    await initQuizModule(state);

    //   setState({ ...state, event: EventState.READY });
}
