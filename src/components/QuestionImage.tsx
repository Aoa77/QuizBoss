import { useAppContext } from "../app/App.context";
import { AnimeComponent } from "../code/Anime";
import { useAnimeRef } from "../libs/anime-context/AnimeContext";
import { useStyle } from "./QuestionImage.style";

export function QuestionImage() {
    ///
    const style = useStyle();
    const animation = useAnimeRef(AnimeComponent.QuestionImage);

    ///
    const { state } = useAppContext();
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
            />
        </section>
    );
}
