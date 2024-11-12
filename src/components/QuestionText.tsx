import { useAppContext } from "../app/context";
import { ANIM } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { useStyle } from "./QuestionText.style";

export function QuestionText() {
    ////
    const animation = useAnimeRef(ANIM.QuestionText);
    const style = useStyle();
    const { state } = useAppContext();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { questionText } = quizData;

    return (
        <section id={animation.id} style={style?.section}>
            {questionText}
        </section>
    );
}
