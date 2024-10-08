// import { flow } from "../../core/context/flow";
// import { QuizState } from "../models/QuizState";
// import { ELEMENT } from "../animation/elements";
// import { EventState } from "../models/EventState";
// import { DELAY } from "../animation/times";
// import { wait } from "../../core/animation/wait";
// import { fadeIn } from "../../core/animation/fade";

// ///
// export async function onReady() {
//     const [title] = xref.headings(ELEMENT.title);
//     await wait(DELAY.PRE_TITLE);
//     await title.runAnimation(fadeIn());
//     await wait(DELAY.POST_TITLE);

//     // use this to automate testing the settings panel toggle
//     // while (true) {
//     //     toggleSettingsPanel();
//     //     await delay(Duration.ONE_SECOND, Multiplier.x3);
//     // }

//     const [state, setState] = flow<QuizState>();
//     setState({ ...state, event: EventState.LOADING });
// }
