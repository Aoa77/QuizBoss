import { getElementDivs } from "../../core/functions/getElementDivs";
import { ELEMENT } from "../animation/elements";
import { fadeIn } from "../animation/fade";
import { getAppState } from "../functions/getAppState";
import { initQuizModule } from "../functions/initQuizModule";
import { GameState } from "../models/GameState";

///
export async function onInit() {
    const [state, setState] = getAppState();
    const [loading] = getElementDivs(ELEMENT.loading);

    await loading.runAnimation(fadeIn());
    await initQuizModule(state);
    setState({ ...state, gameState: GameState.READY });
}
