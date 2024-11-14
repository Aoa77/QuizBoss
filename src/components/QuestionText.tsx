import { useAppContext } from "../code/AppContext";
import { ANIM } from "../code/AnimationManager";
import { SectionStyle, TV, ThemeFont } from "../code/style";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

export function QuestionText() {
    ////
    const animation = useAnimeRef(ANIM.QuestionText);
    const style = useStyle();
    const { state } = useAppContext();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { questionText } = quizData;

    return (
        <section id={animation.id} style={style?.section}>
            {questionText}
        </section>
    );
}

function useStyle(): SectionStyle | null {
    // return null;  // INLINE STYLES;
    return {
        section: {
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.QuestionText_color),
            fontFamily: ThemeFont.sans,
            fontSize: CssUnit.rem(3.3),
            marginTop: CssUnit.cqh(37),
        },
    };
}
