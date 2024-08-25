import { Context } from "../components/Context";
import { GameState } from "../components/GameState";
import { initQuizModule } from "../components/QuizModule";
import { showElementRef } from "../components/Elements";

///
var isInitializing: boolean = false;

///
export async function onInit(context: Context) {
    const { config, elements, setQuizModule } = context;
    showElementRef(elements.loading);

    console.info({ isInitializing });
    if (isInitializing) {
        return;
    }
    isInitializing = true;

    await initQuizModule(config, setQuizModule);
    context.setGameState(GameState.STARTUP);
}
