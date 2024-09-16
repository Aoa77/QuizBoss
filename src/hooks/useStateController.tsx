import { useState } from "react";
import { GameState } from "../state/GameState";
import State from "../state/State";
import StateController from "../state/StateController";

let isLocalStorageInitialized = false;
export default function useStateController(): StateController {
    const [state, setState] = useState<State>({
        answerSpot: 0,
        currentItemIndex: 0,
        gameState: GameState.INIT,
        guessValue: "",
        quizModule: null,
        score: 0,
        best: 0,
    });

    const context: StateController = { state, setState };
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
