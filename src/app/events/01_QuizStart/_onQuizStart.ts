import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { fadeIn } from "../../../core/animation/fade";
import { ELEMENT } from "../../constants/ELEMENT";
import { xref } from "../../../core/animation/dom/xref";
import { initQuizModule } from "./initQuizModule";
import { initBestScore } from "./initBestScore";
import { LOADING } from "../../constants/LOADING";
import { wait } from "../../../core/animation/wait";
import { EventState } from "../../constants/EventState";

export async function onQuizStart() {
    const [state, setState] = flow<QuizState>();
    const [title] = xref.headings(ELEMENT.title);
    const [loading] = xref.divs(ELEMENT.loading);

    if (state.quizModule === null) {
        //
        loading.runAnimation(fadeIn());
        state.best = initBestScore(state);

        await initQuizModule(state);
        await wait(LOADING.DELAY);
        setState({ ...state, eventWait: ++state.eventWait });
        return;
    }
    
    await title.runAnimation(fadeIn());
    await wait(LOADING.DELAY);
    setState({ ...state, event: EventState.NextQuestion });
}
