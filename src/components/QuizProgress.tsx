import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { AnimeComponent } from "../models/Anime";
import { QuizState } from "../models/QuizState";
import { useStyle } from "./QuizProgress.style";

export function QuizProgress() {
    ////
    const animation = useAnimeRef(AnimeComponent.QuizProgress);
    const style = useStyle();
    const [state] = FlowContext.current<QuizState>();
    const { currentItemIndex, quizModule } = state;
    if (!quizModule) {
        return null;
    }

    ///
    const { quizData } = quizModule;
    const { items } = quizData;

    ///
    return (
        <section id={animation.id} style={style.section}>
            {currentItemIndex + 1} / {items.length}
        </section>
    );
}
