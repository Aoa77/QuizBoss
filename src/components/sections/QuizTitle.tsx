import { AnimKey } from "../../animations";
import { SectionStyle, TV, ThemeFont } from "../../core/themes";
import { useAppContext } from "../../core/context";
import { useAnimeRef } from "../../libs/anime-context/hooks";
import { CssUnit } from "../../libs/theme-vars/CssUnit";
import { ThemeVars } from "../../libs/theme-vars/ThemeVars";

export function QuizTitle() {
    const animation = useAnimeRef(AnimKey.QuizTitle);
    const style = useStyle();
    const { state } = useAppContext();
    const { quizModule } = state;
    if (!quizModule) {
        return null;
    }
    const { quizData } = quizModule;
    const { title } = quizData;

    return (
        <section id={animation.id} style={style?.section}>
            {title}
        </section>
    );
}

function useStyle(): SectionStyle | null {
    // return null;  // INLINE STYLES;
    return {
        ///
        section: {
            alignContent: "normal",
            color: ThemeVars.getRef(TV, TV.QuizTitle_color),
            fontFamily: ThemeFont.cursive,
            fontSize: CssUnit.rem(6.5),
            marginTop: CssUnit.cqh(5),
        },
    };
}