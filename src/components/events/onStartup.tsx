import { Context } from "../Context";
import { GameState } from "../GameState";
import { showElementRef } from "../Elements";

///
export async function onStartup(context: Context) {
    const { elements, setGameState } = context;
    showElementRef(elements.title);
    setGameState(GameState.LOADING);
}