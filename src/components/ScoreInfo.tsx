import { useAppContext } from "../app/context";
import { ANIM } from "../code/animation";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { useStyle } from "./ScoreInfo.style";

export function ScoreInfo() {
    ////
    const animation = useAnimeRef(ANIM.ScoreInfo);
    const style = useStyle();
    const { state } = useAppContext();
    const { quizScore } = state;

    return (
        <section id={animation.id} style={style?.section}>
            <div></div>
            <span style={style?.span}>SCORE: </span>
            {quizScore}
        </section>
    );
}
