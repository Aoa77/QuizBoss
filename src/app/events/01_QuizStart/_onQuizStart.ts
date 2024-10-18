import { flow } from "../../../core/context/flow";
import { QuizState } from "../../models/QuizState";
import { initQuizModule } from "./initQuizModule";
import { initBestScore } from "./initBestScore";
import { wait } from "../../../core/animation/wait";
import { EventState } from "../../constants/EventState";
import { TIME } from "../../constants/TIME";
import { LoadingAnimation } from "../../components/LoadingSpinner.animation";
import { AsyncGroup } from "../../../core/util/AsyncGroup";
import { applyTheme } from "../../components/App.theme";
import { TitleAnimation } from "../../components/TitleHeading.animation";

export async function onQuizStart() {
    const [state, setState] = flow<QuizState>();

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

    await TitleAnimation.fadeIn();
    await wait(TIME.START_DELAY);
    setState({ ...state, event: EventState.NextQuestion });
}
