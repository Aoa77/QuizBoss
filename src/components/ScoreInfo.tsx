import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { AnimeComponent } from "../code/Anime";
import { AppState } from "../app/App.state";
import { useStyle } from "./ScoreInfo.style";

export function ScoreInfo() {
    ////
    const animation = useAnimeRef(AnimeComponent.ScoreInfo);
    const style = useStyle();
    const [state] = FlowContext.current<AppState>();
    const { quizScore } = state;

    return (
        <section id={animation.id} style={style.section}>
            <div></div><span style={style.span}>SCORE: </span>{quizScore}
        </section>
    );
}
