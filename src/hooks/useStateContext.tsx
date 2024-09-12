import { GameState } from "../enums";
import { State } from "../models";
import { StateContext } from "../context";
import { useState } from "react";

var isLocalStorageInitialized = false;
export default function useStateContext(): StateContext {
    const [state, setState] = useState<State>({
        currentItemIndex: 0,
        gameState: GameState.INIT,
        guessValue: "",
        quizModule: null,
        score: 0,
        best: 0,
    });

    const context: StateContext = { state, setState };
    if (isLocalStorageInitialized) {
        return context;
    }
    isLocalStorageInitialized = true;
    let local: string = localStorage.getItem("bestScore") ?? "";
    local = local.trim();
    if (local.length > 0) {
        context.setState({ ...context.state, best: parseInt(local) });
    }
    return context;
}
