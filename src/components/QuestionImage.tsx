import { CSSProperties } from "react";
import { useAppContext } from "../app/context";
import { ANIM } from "../code/animation";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { useStyle } from "./QuestionImage.style";

export function QuestionImage() {
    ///
    const style = useStyle();
    const animation = useAnimeRef(ANIM.QuestionImage);

    ///
    const { state } = useAppContext();
    const { currentItem, currentItemIndex, quizModule } = state;
    if (currentItem === null || quizModule === null) {
        return null;
    }
    const { quizData } = quizModule;
    const { items } = quizData;

    const images = items.map((item, index) => (
        <img
            key={index}
            src={item.imageSrc}
            style={computeImageStyle(index, currentItemIndex, style?.image)}
            alt=""
        />
    ));

    ///
    return (
        <section id={animation.id} style={style?.section}>
            {images}
        </section>
    );
}

function computeImageStyle(
    index: number,
    currentItemIndex: number,
    style: CSSProperties | undefined,
): CSSProperties | undefined {
    if (!style) {
        return undefined;
    }
    if (index === currentItemIndex) {
        style = { ...style, display: "unset" };
    }
    return style;
}
