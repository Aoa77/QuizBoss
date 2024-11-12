import { useAppContext } from "../app/context";
import { ANIM } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { useStyle } from "./QuizProgress.style";

export function QuizProgress() {
    ////
    const animation = useAnimeRef(ANIM.QuizProgress);
    const style = useStyle();
    const { state } = useAppContext();
    const { currentItemIndex, quizModule } = state;
    if (!quizModule) {
        return null;
    }

    ///
    const { quizData } = quizModule;
    const { items } = quizData;

    ///
    return (
        <section id={animation.id} style={style?.section}>
            {currentItemIndex + 1} / {items.length}
        </section>
    );
}
