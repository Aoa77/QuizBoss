import { useState } from "react";
import { AppState } from "../models";
import { GameState } from "../enums";
import { StateContext } from "../context";

var isLocalStorageInitialized = false;
export default function useAppState() : StateContext {


    const [state, setState] = useState<AppState>({
        currentItemIndex: 0,
        gameState: GameState.INIT,
        guessValue: "",
        quizModule: null,
        score: 0,
        best: 0,
    });

    const hook :StateContext= { state, setState };
    if (isLocalStorageInitialized) {
        return hook;
    }
    isLocalStorageInitialized = true;
    let local: string = localStorage.getItem("bestScore") ?? "";
    local = local.trim();
    if (local.length > 0) {
        hook.setState({ ...hook.state, best: parseInt(local) });
    }
    return hook;
}

