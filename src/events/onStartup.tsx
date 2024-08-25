import { Context } from "../context/Context";
import { GameState } from "../context/GameState";
import { showElementRef } from "../utilities";

///
export async function onStartup(context: Context) {
    const { elements, setGameState } = context;
    showElementRef(elements.title);
    setGameState(GameState.LOADING);
}