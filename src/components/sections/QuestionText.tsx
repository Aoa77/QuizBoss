import { useAppContext } from "../../core/context";
import { AnimKey } from "../../animations";
import { SectionStyle, TV, ThemeFont } from "../../core/themes";
import { useAnimeRef } from "../../libs/anime-context/hooks";
import { CssUnit } from "../../libs/theme-vars/CssUnit";
import { ThemeVars } from "../../libs/theme-vars/ThemeVars";

export function QuestionText() {
    ////
    const animation = useAnimeRef(AnimKey.QuestionText);
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
