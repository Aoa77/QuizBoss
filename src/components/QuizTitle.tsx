import { useAppContext } from "../app/context";
import { ANIM } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { useStyle } from "./QuizTitle.style";

export function QuizTitle() {
    const animation = useAnimeRef(ANIM.QuizTitle);
    const style = useStyle();
    const { state } = useAppContext();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { title } = quizData;

    return (
        <section
            id={animation.id}
            style={style?.section}>
            {title}
        </section>
    );
}
