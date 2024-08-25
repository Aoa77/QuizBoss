import { Context } from "../Context";
import { GameState } from "../GameState";
import { initQuizModule } from "../QuizModule";
import { showElementRef } from "../Elements";

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
