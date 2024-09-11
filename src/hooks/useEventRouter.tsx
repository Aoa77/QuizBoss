import { GameState } from "../enums";
import { onInit, onLoading, onNext, onInput, onResult, onGameOver } from "../events";
import { useEffect } from "react";
import AppContext from "./AppContext";

type EventHandlers = {
    [key in GameState]: (context: AppContext) => void;
};

const eventHandlers: EventHandlers = {
    [GameState.INIT]: onInit,
    [GameState.LOADING]: onLoading,
    [GameState.NEXT]: onNext,
    [GameState.INPUT]: onInput,
    [GameState.RESULT]: onResult,
    [GameState.GAMEOVER]: onGameOver,
};

export default function useEventRouter(context: AppContext) {
    useEffect(() => {
        console.info("useEventRouter", context.stateContext.state.gameState, context);

        const eventHandler = eventHandlers[context.stateContext.state.gameState];
        if (eventHandler) {
            eventHandler(context);
        } else {
            throw new Error(`Invalid game state: ${context.stateContext.state.gameState}`);
        }
    }, [context]);
}
