import { Context } from "./Context";
import { GameState } from "./GameState";
import { useEffect } from "react";
import * as Events from "./Events";

export function useQuizFlow(context: Context) {
    
    useEffect(() => {
        const gameState = context.gameState;
        console.info("useQuizFlow", gameState);

        switch (gameState) {
            case GameState.INPUT:
                return;

            case GameState.INIT:
                Events.onInit(context);
                return;

            case GameState.STARTUP:
                Events.onStartup(context);
                return;

            case GameState.LOADING:
                Events.onLoading(context);
                return;

            case GameState.NEXT:
                Events.onNext(context);
                return;

            case GameState.RESULT:
                Events.onResult(context);
                return;

            default:
                throw new Error(`Invalid game state: ${gameState}`);
        }
    }, [context]);
}
