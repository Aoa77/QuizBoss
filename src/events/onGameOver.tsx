import { AppContext } from "../app";

///
export async function onGameOver(context: AppContext) {
    console.info("game over");
    const { elements } = context;
    elements.clearScoreBonusStyle();
}