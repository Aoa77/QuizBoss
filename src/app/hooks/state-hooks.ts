import { Dispatch, SetStateAction } from "react";
import { getStateFlow } from "../../core/state-flow/getStateFlow";
import { useStateFlow } from "../../core/state-flow/useStateFlow";
import { AppState, createInitialState } from "../models/AppState";
import { AppSettings } from "../models/AppSettings"; 
import { GameState } from "../models/GameState";
import { onGameOver } from "../events/onGameOver";
import { onInit } from "../events/onInit";
import { onInput } from "../events/onInput";
import { onLoaded } from "../events/onLoaded";
import { onNext } from "../events/onNext";
import { onReady } from "../events/onReady";
import { onResult } from "../events/onResult";

///
let isLocalStorageInitialized = false;

///
export function useAppState(
    settings: AppSettings,
): [AppState, Dispatch<SetStateAction<AppState>>] {

    const flow = useStateFlow<AppState, GameState>({
        initialState: createInitialState(settings),
        getFlowEvent: (state) => {
            return state.gameState;
        },
        eventHandlers: new Map<GameState, (state: AppState) => Promise<void>>([
            [GameState.INIT, onInit],
            [GameState.READY, onReady],
            [GameState.LOADING, onLoaded],
            [GameState.NEXT, onNext],
            [GameState.INPUT, onInput],
            [GameState.RESULT, onResult],
            [GameState.GAMEOVER, onGameOver],
        ]),
    });

    //////////////////
    if (isLocalStorageInitialized) {
        return flow;
    }
    isLocalStorageInitialized = true;

    ////////////
    let local: string = localStorage.getItem("bestScore") ?? "";
    local = local.trim();
    if (local.length > 0) {
        const [state, setState] = flow;
        setState({ ...state, best: parseInt(local) });
    }

    //////////////////
    return flow;
}

export function getAppState(): [AppState, Dispatch<SetStateAction<AppState>>] {
    return getStateFlow<AppState>();
}

