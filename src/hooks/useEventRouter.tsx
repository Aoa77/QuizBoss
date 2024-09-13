import { ContextController } from "../controllers";
import { GameState } from "../enums";
import { onInit, onLoading, onNext, onInput, onResult, onGameOver } from "../events";
import { useEffect } from "react";

type EventHandlers = {
    [key in GameState]: (context: ContextController) => void;
};

const eventHandlers: EventHandlers = {
    [GameState.INIT]: onInit,
    [GameState.LOADING]: onLoading,
    [GameState.NEXT]: onNext,
    [GameState.INPUT]: onInput,
    [GameState.RESULT]: onResult,
    [GameState.GAMEOVER]: onGameOver,
};

export default function useEventRouter(context: ContextController) {
    useEffect(() => {
        console.info("useEventRouter", context.stateController.state.gameState, context);

        const eventHandler = eventHandlers[context.stateController.state.gameState];
        if (eventHandler) {
            eventHandler(context);
        } else {
            throw new Error(`Invalid game state: ${context.stateController.state.gameState}`);
        }
    }, [context]);
}
