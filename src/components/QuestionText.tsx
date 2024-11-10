import { useAppContext } from "../app/App.context";
import { AnimeComponent } from "../code/Anime";
import { useAnimeRef } from "../libs/anime-context/AnimeContext";
import { useStyle } from "./QuestionText.style";

export function QuestionText() {
    ////
    const animation = useAnimeRef(AnimeComponent.QuestionText);
    const style = useStyle();
    const { state } = useAppContext();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { questionText } = quizData;

    return (
        <section id={animation.id} style={style.section}>
            {questionText}
        </section>
    );
}
