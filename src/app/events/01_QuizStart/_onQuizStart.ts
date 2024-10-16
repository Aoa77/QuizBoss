import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { initQuizModule } from "./initQuizModule";
import { initBestScore } from "./initBestScore";
import { wait } from "../../../core/animation/wait";
// import { EventState } from "../../constants/EventState";
import { TIME } from "../../constants/TIME";
// import { LayoutAnimation } from "../../animations/LayoutAnimation";
import { LoadingSpinnerAnimation } from "../../components/LoadingSpinner";

export async function onQuizStart() {
    const [state, setState] = flow<QuizState>();

    if (state.quizModule === null) {
        //
        LoadingSpinnerAnimation.fadeIn();
        state.best = initBestScore(state);

        await initQuizModule(state);
        await wait(TIME.START_DELAY);
        setState({ ...state, eventWait: ++state.eventWait });
        return;
    }

    // await LayoutAnimation.TitleHeading().fadeIn();
    await wait(TIME.START_DELAY);
    // setState({ ...state, event: EventState.NextQuestion });
}
