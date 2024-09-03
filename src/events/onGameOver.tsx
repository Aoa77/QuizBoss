import { AppContext } from "../models";

///
export async function onGameOver(context: AppContext) {
    console.info("game over");
    const { elementsHook } = context;
    elementsHook.clearScoreMarks();
}