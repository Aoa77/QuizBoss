import { AppContext } from "../app";

///
export async function onGameOver(context: AppContext) {
    const { elements } = context;
    elements.clearScoreBonusStyle();
}