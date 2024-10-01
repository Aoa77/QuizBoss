import { getAppState } from "../hooks/useAppState";
import { initQuizModule } from "../functions/initQuizModule";
import { GameState } from "../models/GameState";
import { fadeIn } from "../../core/animation/fade";
import { getElementDivs } from "../../core/xelemental/getElementDivs";
import { ELEMENT } from "../animation/elements";

///
export async function onInit() {
    const [state, setState] = getAppState();
    const [loading] = getElementDivs(ELEMENT.loading);

    await loading.runAnimation(fadeIn());
    await initQuizModule(state);
    setState({ ...state, gameState: GameState.READY });
}
