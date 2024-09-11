import { AppContext } from "../context";

///
export async function onGameOver(context: AppContext) {
    console.info("game over");
    const { elementContext } = context;
    elementContext.clearScoreMarks();
}