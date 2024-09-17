import AppContext from "../app/AppContext";
import AppSettings from "../app/AppSettings";
import initQuizModule from "../functions/initQuizModule";
import { GameState } from "../state/GameState";
import delay from "../time/delay";
import { Duration } from "../time/Duration";
import { Multiplier } from "../time/Multiplier";

///
export async function onInit(context: AppContext) {
    const { elements, states } = context;
    const { refs } = elements;
    const { loading } = refs;
    const { state, setState } = states;
    const { quizModuleName } = AppSettings.get();

    await elements.fadeIn(loading.target);
    await initQuizModule(quizModuleName, state);
    await delay(Duration.WAIT, Multiplier.x3);

    setState({ ...state, gameState: GameState.READY });
}
