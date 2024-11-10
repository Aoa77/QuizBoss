import { useAppContext } from "../app/App.context";
import { AnimeComponent } from "../code/Anime";
import { useAnimeRef } from "../libs/anime-context/AnimeContext";
import { useStyle } from "./QuizTitle.style";

export function QuizTitle() {
    const animation = useAnimeRef(AnimeComponent.QuizTitle);
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
            style={style.section}>
            {title}
        </section>
    );
}
