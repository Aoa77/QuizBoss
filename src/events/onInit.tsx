import AppContext from "../app/AppContext";
import initQuizModule from "../functions/initQuizModule";
import { GameState } from "../state/GameState";
import delay from "../time/delay";
import { Duration } from "../time/Duration";
import { Multiplier } from "../time/Multiplier";

///
export default async function onInit() {
    const appState = AppContext.appState();
    const { state, setState } = appState;

    const elements = AppContext.elements();
    const { refs } = elements;
    const { loading } = refs;
    
    const settings = AppContext.settings();
    const { quizModuleName } = settings;

    await elements.fadeIn(loading.target);
    await initQuizModule(quizModuleName, state);
    await delay(Duration.WAIT, Multiplier.x3);

    setState({ ...state, gameState: GameState.READY });
}
