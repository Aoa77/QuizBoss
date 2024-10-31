import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { AnimeComponent } from "../models/Anime";
import { QuizState } from "../models/QuizState";
import { useStyle } from "./QuestionTimer.style";

export function QuestionTimer() {
    ////
    const animation = useAnimeRef(AnimeComponent.QuestionTimer);
    const style = useStyle();
    const [state] = FlowContext.current<QuizState>();
    const { itemTimer } = state;

    return (
        <section id={animation.id} style={style.section}>
            0:0{itemTimer}
        </section>
    );
}
