import { AppProps, clearScoreMarks } from "../props";

///
export async function onGameOver(props: AppProps) {
    console.info("game over");
    const { elements } = props;
    clearScoreMarks(elements);
}