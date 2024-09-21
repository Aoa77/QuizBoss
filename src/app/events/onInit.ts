import initQuizModule from "../functions/initQuizModule";
import { GameState } from "../models/GameState";
import wait from "../../core/timing/wait";
import { Duration } from "../elements/fade";
import { getAppStateFlow } from "../appFlow/useAppStateFlow";
import { getXref } from "../../core/hooks/useXref";
import { ElementNames } from "../elements/ElementNames";
import { Fade } from "../../core/animation/fade";

///
export default async function onInit() {
    const [state, setState] = getAppStateFlow();
    const [loading] = getXref<HTMLDivElement>({ id: ElementNames.loading });
    await loading.fade({ opacity: Fade.IN });
    await initQuizModule(state);
    await wait({ duration: Duration.WAIT });
    setState({ ...state, gameState: GameState.READY });
}
