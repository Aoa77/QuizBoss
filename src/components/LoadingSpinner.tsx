import { ANIM } from "../code/Animation";
import { useAppContext } from "../app/context";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { useStyle } from "./LoadingSpinner.style";

export function LoadingSpinner() {
    const { state } = useAppContext();
    const { loadingMessage } = state;
    const sectionRef = useAnimeRef(ANIM.LoadingSpinner);
    const messageRef = useAnimeRef(ANIM.LoadingMessage);
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
