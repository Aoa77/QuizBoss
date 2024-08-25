import AllProps from "../props/AllProps";
import { GameState } from "../props/Enums";
import { useEffect } from "react";
import * as events from "../events";

export default function useEventRouter(props: AllProps) {
    useEffect(() => {
        const gameState = props.gameState;
        console.info("useEventRouter", gameState);

        switch (gameState) {
            //
            case GameState.INIT:
                events.onInit(props);
                return;

            case GameState.STARTUP:
                events.onStartup(props);
                return;

            case GameState.LOADING:
                events.onLoading(props);
                return;

            case GameState.NEXT:
                events.onNext(props);
                return;

            case GameState.INPUT:
                events.onInput();
                return;

            case GameState.RESULT:
                events.onResult(props);
                return;

                case GameState.GAMEOVER:
                    events.onGameOver();
                    return;

            default:
                throw new Error(`Invalid game state: ${gameState}`);
        }
    }, [props]);
}




