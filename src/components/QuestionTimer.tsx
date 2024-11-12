import { ANIM } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { useStyle } from "./QuestionTimer.style";

export function QuestionTimer() {
    const animation = useAnimeRef(ANIM.QuestionTimer);
    const style = useStyle();

    return (
        <section style={style?.section}>
            <div id={animation.id} style={style?.digits}></div>
        </section>
    );
}
