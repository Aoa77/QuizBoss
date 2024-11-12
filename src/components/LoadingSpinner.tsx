import { useAppContext } from "../app/context";
import { AnimComponent } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/AnimeHooks";
import { useStyle } from "./LoadingSpinner.style";

export function LoadingSpinner() {
    const { state } = useAppContext();
    const { loadingMessage } = state;
    const sectionRef = useAnimeRef(AnimComponent.LoadingSpinner);
    const messageRef = useAnimeRef(AnimComponent.LoadingMessage);
    const style = useStyle();
    ///
    return (
        <section id={sectionRef.id} style={style?.section}>
            <div id={messageRef.id}>{loadingMessage}</div>
            <div>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </section>
    );
}
