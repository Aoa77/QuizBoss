import { Context } from "./Context";
import { GameState } from "./GameState";
import { useEffect } from "react";
import * as events from "./events";

export function useGameFlow(context: Context) {
    useEffect(() => {
        const gameState = context.gameState;
        console.info("useGameFlow", gameState);

        switch (gameState) {
            //
            case GameState.INIT:
                events.onInit(context);
                return;

            case GameState.STARTUP:
                events.onStartup(context);
                return;

            case GameState.LOADING:
                events.onLoading(context);
                return;

            case GameState.NEXT:
                events.onNext(context);
                return;

            case GameState.INPUT:
                events.onInput();
                return;

            case GameState.RESULT:
                events.onResult(context);
                return;

                case GameState.GAMEOVER:
                    events.onGameOver();
                    return;

            default:
                throw new Error(`Invalid game state: ${gameState}`);
        }
    }, [context]);
}
