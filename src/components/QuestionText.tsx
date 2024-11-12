import { useAppContext } from "../app/context";
import { AnimComponent } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/AnimeHooks";
import { useStyle } from "./QuestionText.style";

export function QuestionText() {
    ////
    const animation = useAnimeRef(AnimComponent.QuestionText);
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
