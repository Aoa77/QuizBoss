import { FlowContext } from "../../../../src/context/FlowContext";
import { QuizState } from "../../../../src/models/QuizState";
import { initQuizModule } from "./initQuizModule";
import { initBestScore } from "./initBestScore";
import { wait } from "../../../core/animation/wait";

import { TIME } from "../../constants/TIME";
import { LoadingAnimation } from "../../components/LoadingSpinner.xref";
import { AsyncGroup } from "../../../../src/util/AsyncGroup";
import { $TitleHeading } from "../../components/TitleHeading.xref";
import { EventName } from "../../../../src/models/EventName";
import { Theme } from "../../../../src/context/Theme";

export async function onQuizStart() {
    const [state, setState] = FlowContext.context<QuizState>();

    if (state.quizModule === null) {
        state.best = initBestScore(state);

        const asyncGroup = new AsyncGroup();
        asyncGroup.add(
            Theme.apply(state.settings.theme).then(() =>
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
    setState({ ...state, eventName: EventName.NextQuestion });
}
