import { Flow } from "../../../../src/context/FlowContext";
import { QuizState } from "../../../../src/models/QuizState";
import { initQuizModule } from "./initQuizModule";
import { initBestScore } from "./initBestScore";
import { wait } from "../../../core/animation/wait";
import { EventState } from "../../constants/EventState";
import { TIME } from "../../constants/TIME";
import { LoadingAnimation } from "../../components/LoadingSpinner.xref";
import { AsyncGroup } from "../../../core/util/AsyncGroup";
import { applyTheme } from "../../components/App.theme";
import { $TitleHeading } from "../../components/TitleHeading.xref";

export async function onQuizStart() {
    const [state, setState] = Flow.context<QuizState>();

    if (state.quizModule === null) {
        state.best = initBestScore(state);

        const asyncGroup = new AsyncGroup();
        asyncGroup.add(
            applyTheme(state.settings.theme).then(() =>
                LoadingAnimation.start(),
            ),
        );
        asyncGroup.add(initQuizModule(state));
        await asyncGroup.all();

        await wait(TIME.START_DELAY);
        setState({ ...state, eventWait: ++state.eventWait });
        return;
    }

    await $TitleHeading.xref.fadeIn.play();
    await wait(TIME.START_DELAY);
    setState({ ...state, event: EventState.NextQuestion });
}
