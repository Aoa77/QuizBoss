import { useEffect } from "react";
import AppContext from "../app/AppContext";
import onGameOver from "../events/onGameOver";
import onInit from "../events/onInit";
import onInput from "../events/onInput";
import onLoaded from "../events/onLoaded";
import onNext from "../events/onNext";
import onReady from "../events/onReady";
import onResult from "../events/onResult";
import { GameState } from "../state/GameState";

type EventHandlers = {
    [key in GameState]: () => void;
};

const eventHandlers: EventHandlers = {
    [GameState.INIT]: onInit,
    [GameState.READY]: onReady,
    [GameState.LOADING]: onLoaded,
    [GameState.NEXT]: onNext,
    [GameState.INPUT]: onInput,
    [GameState.RESULT]: onResult,
    [GameState.GAMEOVER]: onGameOver,
};

export default function useEventRouter() {
    ///
    const appState = AppContext.appState();
    const { state } = appState;

    ///
    useEffect(() => {
        const { gameState } = state;
        console.info(state.gameState);

        const eventHandler = eventHandlers[gameState];
        if (eventHandler) {
            eventHandler();
        } else {
            throw new Error(`Invalid game state: ${gameState}`);
        }
        ///
    }, [state]);
}
