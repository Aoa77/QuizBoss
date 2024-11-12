import { useAppContext } from "../app/context";
import { AnimComponent } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/AnimeHooks";
import { useStyle } from "./QuizTitle.style";

export function QuizTitle() {
    const animation = useAnimeRef(AnimComponent.QuizTitle);
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
