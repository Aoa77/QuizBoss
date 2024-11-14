import { AnimKey } from "../../animations";
import { useAnimeRef } from "../../libs/anime-context/hooks";

export function LoadingSpinner() {
    // style is also used outside the react app in app-loader.css
    const animation = useAnimeRef(AnimKey.LoadingSpinner);
    ///
    return (
        <section id={animation.id}>
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
