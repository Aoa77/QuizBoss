import { AppProps } from "../props";
import { GameState } from "../enums";
import { useEffect } from "react";
import * as events from "../events";

export default function useEventRouter(props: AppProps) {
    useEffect(() => {
        console.info("useEventRouter", props.gameState);

        switch (props.gameState) {
            //
            case GameState.INIT:
                events.onInit(props);
                break;

            case GameState.LOADING:
                events.onLoading(props);
                break;

            case GameState.NEXT:
                events.onNext(props);
                break;

            case GameState.INPUT:
                events.onInput();
                break;

            case GameState.RESULT:
                events.onResult(props);
                break;

            case GameState.GAMEOVER:
                events.onGameOver();
                break;

            default:
                throw new Error(`Invalid game state: ${props.gameState}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.gameState]);
}

