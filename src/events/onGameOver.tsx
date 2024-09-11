import { AppContext } from "../hooks";

///
export async function onGameOver(context: AppContext) {
    console.info("game over");
    const { elementContext } = context;
    elementContext.clearScoreMarks();
}