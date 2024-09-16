import { useEffect } from "react";
import AppContext from "../app/AppContext";
import { onGameOver } from "../events/onGameOver";
import { onInit } from "../events/onInit";
import { onInput } from "../events/onInput";
import { onLoading } from "../events/onLoading";
import { onNext } from "../events/onNext";
import { onReady } from "../events/onReady";
import { onResult } from "../events/onResult";
import { GameState } from "../state/GameState";

type EventHandlers = {
    [key in GameState]: (context: AppContext) => void;
};

const eventHandlers: EventHandlers = {
    [GameState.INIT]: onInit,
    [GameState.READY]: onReady,
    [GameState.LOADING]: onLoading,
    [GameState.NEXT]: onNext,
    [GameState.INPUT]: onInput,
    [GameState.RESULT]: onResult,
    [GameState.GAMEOVER]: onGameOver,
};

export default function useEventRouter(context: AppContext) {
    console.info({ eventHandlers });
    useEffect(() => {
        console.info(context.states.state.gameState);
        // debugger;
        const eventHandler = eventHandlers[context.states.state.gameState];
        if (eventHandler) {
            eventHandler(context);
        } else {
            throw new Error(
                `Invalid game state: ${context.states.state.gameState}`,
            );
        }
    }, [context]);
}
