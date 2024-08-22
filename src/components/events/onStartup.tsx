import { Context } from "../Context";
import { GameState } from "../GameState";
import * as util from "../Util";

///
export async function onStartup(context: Context) {
    const { elements, setGameState } = context;
    util.showElement(elements.title);
    setGameState(GameState.LOADING);
}