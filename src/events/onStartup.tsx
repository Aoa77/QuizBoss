import { Context } from "../components/Context";
import { GameState } from "../components/GameState";
import { showElementRef } from "../components/Elements";

///
export async function onStartup(context: Context) {
    const { elements, setGameState } = context;
    showElementRef(elements.title);
    setGameState(GameState.LOADING);
}