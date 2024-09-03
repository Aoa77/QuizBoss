import { AppProps } from "../props";
import { GameState } from "../enums";
import { useEffect } from "react";
import { onInit, onLoading, onNext, onInput, onResult, onGameOver } from "../events";

type EventHandlers = {
    [key in GameState]: (props: AppProps) => void;
};

const eventHandlers: EventHandlers = {
    [GameState.INIT]: onInit,
    [GameState.LOADING]: onLoading,
    [GameState.NEXT]: onNext,
    [GameState.INPUT]: onInput,
    [GameState.RESULT]: onResult,
    [GameState.GAMEOVER]: onGameOver,
};

export default function useEventRouter(props: AppProps) {
    useEffect(() => {
        console.info("useEventRouter", props.state.gameState, props);

        const eventHandler = eventHandlers[props.state.gameState];
        if (eventHandler) {
            eventHandler(props);
        } else {
            throw new Error(`Invalid game state: ${props.state.gameState}`);
        }
    }, [props]);
}
