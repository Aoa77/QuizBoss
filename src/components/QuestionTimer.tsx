import { AnimComponent } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/AnimeHooks";
import { useStyle } from "./QuestionTimer.style";

export function QuestionTimer() {
    const animation = useAnimeRef(AnimComponent.QuestionTimer);
    const style = useStyle();

    return (
        <section style={style?.section}>
            <div id={animation.id} style={style?.digits}></div>
        </section>
    );
}
