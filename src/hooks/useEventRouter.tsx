import { useEffect } from "react";
import { AppContext } from "../app";
import {
    onGameOver,
    onInit,
    onInput,
    onLoading,
    onNext,
    onReady,
    onResult,
} from "../events";
import { GameState } from "../state";

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
    
    console.info({eventHandlers});
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
