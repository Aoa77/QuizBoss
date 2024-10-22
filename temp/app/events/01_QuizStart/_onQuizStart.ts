import { FlowContext } from "../../../../src/libs/flow-context/FlowContext";
import { QuizState } from "../../../../src/models/QuizState";
import { initQuizModule } from "./initQuizModule";
import { initBestScore } from "./initBestScore";
import { wait } from "../../../core/animation/wait";

import { TIME } from "../../constants/TIME";
import { TaskGroup } from "../../../../src/libs/friendlies/Task";
import { EventName } from "../../../../src/models/EventName";

export async function onQuizStart() {
    const [state, setState] = FlowContext.current<QuizState>();

    if (state.quizModule === null) {
        state.bestScore = initBestScore(state);

        const asyncGroup = new TaskGroup();
        // asyncGroup.add(
        //     ThemeVars.apply(state.settings.theme).then(() =>
        //         // LoadingAnimation.start(),
        //     ),
        // );
        asyncGroup.add(initQuizModule(state));
        await asyncGroup.all();

        await wait(TIME.START_DELAY);
        // setState({ ...state, eventWait: ++state.eventWait });
        return;
    }

    // await $TitleHeading.xref.fadeIn.play();
    await wait(TIME.START_DELAY);
    setState({ ...state, eventName: EventName.NextQuestion });
}
