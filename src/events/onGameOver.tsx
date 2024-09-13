import { ContextController } from "../controllers";

///
export async function onGameOver(context: ContextController) {
    console.info("game over");
    const { elements: elementController } = context;
    elementController.clearScoreMarks();
}