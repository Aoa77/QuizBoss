import { useAppContext } from "../app/App.context";
import { AnimeComponent } from "../code/Anime";
import { useAnimeRef } from "../libs/anime-context/AnimeHooks";
import { useStyle } from "./QuestionImage.style";

export function QuestionImage() {
    ///
    const style = useStyle();
    const animation = useAnimeRef(AnimeComponent.QuestionImage);

    ///
    const { state } = useAppContext();
    const { currentItem, quizModule } = state;
    if (currentItem === null || quizModule === null) {
        return null;
    }
    const { quizData } = quizModule;
    const { items } = quizData;

    const images = items.reverse().map((item, index) => (
        <img key={index} src={item.imageSrc} style={style?.image} alt="" />
    ));

    ///
    return (
        <section id={animation.id} style={style?.section}>
            {images}
        </section>
    );
}
