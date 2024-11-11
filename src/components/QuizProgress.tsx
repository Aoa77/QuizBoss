import { useAppContext } from "../app/App.context";
import { AnimeComponent } from "../code/Anime";
import { useAnimeRef } from "../libs/anime-context/AnimeHooks";
import { useStyle } from "./QuizProgress.style";

export function QuizProgress() {
    ////
    const animation = useAnimeRef(AnimeComponent.QuizProgress);
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
