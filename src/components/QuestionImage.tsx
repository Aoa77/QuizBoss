import { FlowContext } from "../libs/flow-context/FlowContext";
import { AppState } from "../app/App.state";
import { EventName } from "../code/EventName";
import { useStyle } from "./QuestionImage.style";
import { useAnimeRef } from "../libs/anime-context/AnimeContext.hooks";
import { AnimeComponent } from "../code/Anime";

export function QuestionImage() {
    ///
    const style = useStyle();
    const animation = useAnimeRef(AnimeComponent.QuestionImage);

    ///
    const [state] = FlowContext.current<AppState>();
    const { currentItem } = state;
    if (currentItem === null) {
        return null;
    }

    ///
    return (
        <section id={animation.id} style={style.section}>
            <img
                src={currentItem.imageSrc}
                style={style.image}
                alt=""
                onPointerDown={onPointerDown}
            />
        </section>
    );
}

async function onPointerDown() {
    const [state, setState] = FlowContext.current<AppState>();
    const { settings } = state;
    const { enableSecretQuestionSkip } = settings;
    let { eventName } = state;
    if (!enableSecretQuestionSkip || eventName !== EventName.AwaitGuess) {
        return;
    }
    eventName = EventName.ConcludeQuestion;
    setState((state) => ({ ...state, eventName: EventName.ConcludeQuestion }));
}
