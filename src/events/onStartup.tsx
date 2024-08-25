import AllProps from "../props/AllProps";
import { GameState } from "../props/Enums";
import { showElementRef } from "../utilities";

///
export async function onStartup(props: AllProps) {
    const { elements, setGameState } = props;
    showElementRef(elements.title);
    setGameState(GameState.LOADING);
}