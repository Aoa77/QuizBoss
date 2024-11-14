import { CSSProperties } from "react";
import { useAppContext } from "../code/context";
import { ANIM } from "../code/AnimationManager";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { SectionStyle, TV } from "../code/style";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

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


interface Style extends SectionStyle {
    image: CSSProperties;
}

function useStyle(): Style | null {
    // return null;  // INLINE STYLES;
    const style: Style = {
        ///
        image: {},
        section: {},
    };

    ///
    style.section = {
        marginTop: CssUnit.cqh(14),
    };

    ///
    style.image = {
        cursor: "pointer",
        height: CssUnit.cqh(20),
        boxShadow: `0 0 ${CssUnit.cqw(16)} ${CssUnit.cqw(3)} ${ThemeVars.getRef(
            TV,
            TV.QuestionImage_shadow,
        )}`,
        display: "none",
    };

    ///
    return style;
}
