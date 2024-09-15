import { useEffect } from "react";
import { AppContext, GameState } from "../app";
import {
    onGameOver,
    onInit,
    onInput,
    onLoading,
    onNext,
    onReady,
    onResult,
} from "../events";

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
    useEffect(() => {
        console.info(context.states.state.gameState);

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
