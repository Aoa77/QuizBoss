import { FlowContext } from "../libs/flow-context/FlowContext";
import { AppState } from "../app/App.state";
import { useStyle } from "./QuizTitle.style";
import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { AnimeComponent } from "../code/Anime";

export function QuizTitle() {
    const animation = useAnimeRef(AnimeComponent.QuizTitle);
    const style = useStyle();

    const [state] = FlowContext.current<AppState>();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { title } = quizData;
    
    return (
        <section
            id={animation.id}
            style={style.section}
            onPointerDown={onPointerDown}>
            {title}
        </section>
    );
}

function onPointerDown() {
    const [state] = FlowContext.current<AppState>();
    const { settings } = state;
    const { enableSecretWindowReload } = settings;
    if (!enableSecretWindowReload) {
        return;
    }
    window.location.reload();
}

