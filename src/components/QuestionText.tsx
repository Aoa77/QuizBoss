import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { AnimeComponent } from "../models/Anime";
import { QuizState } from "../models/QuizState";
import { useStyle } from "./QuestionText.style";

export function QuestionText() {
    ////
    const animation = useAnimeRef(AnimeComponent.QuestionText);
    const style = useStyle();
    const [state] = FlowContext.current<QuizState>();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { questionText } = quizData;

    return (
        <section id={animation.id} ref={animation.ref} style={style.section}>
            {questionText}
        </section>
    );
}
