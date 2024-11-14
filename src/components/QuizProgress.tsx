import { useAppContext } from "../code/AppContext";
import { ANIM } from "../code/AnimationManager";
import { SectionStyle, TV, ThemeFont } from "../code/style";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

export function QuizProgress() {
    ////
    const animation = useAnimeRef(ANIM.QuizProgress);
    const style = useStyle();
    const { state } = useAppContext();
    const { currentItemIndex, quizModule } = state;
    if (!quizModule) {
        return null;
    }

    ///
    const { quizData } = quizModule;
    const { items } = quizData;

    ///
    return (
        <section id={animation.id} style={style?.section}>
            {currentItemIndex + 1} / {items.length}
        </section>
    );
}

function useStyle(): SectionStyle | null {
    // return null;  // INLINE STYLES;
    const style: SectionStyle = {
        section: {},
    };

    ///
    style.section = {
        color: ThemeVars.getRef(TV, TV.QuizProgress_color),
        fontFamily: ThemeFont.mono,
        fontSize: CssUnit.rem(2.3),
        fontWeight: "bold",
        marginTop: CssUnit.cqh(93),
    };

    ///
    return style;
}
