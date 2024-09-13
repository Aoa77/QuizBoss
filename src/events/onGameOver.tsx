import { AppContext } from "../app";

///
export async function onGameOver(context: AppContext) {
    console.info("game over");
    const { elements: elementController } = context;
    elementController.clearScoreMarks();
}