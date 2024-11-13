import { useAppContext } from "../app/context";
import { ANIM } from "../code/Animation";
import { useAnimeRef } from "../libs/anime-context/hooks";

export function AppTitle() {
    // style is also used outside the react app in app-loader.css
    const animation = useAnimeRef(ANIM.AppTitle);
    const { state } = useAppContext();
    const { appTitle } = state;

    return (
        <section id={animation.id}>
            {appTitle}
        </section>
    );
}
