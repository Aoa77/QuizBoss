import { useAppContext } from "../app/context";
import { ANIM } from "../code/animation";
import { SectionStyle, TV, ThemeFont } from "../code/style";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

export function AppVersion() {
    ////
    const animation = useAnimeRef(ANIM.AppVersion);
    const style = useStyle();
    const { state } = useAppContext();
    const { appVersion } = state;

    ///
    return (
        <section id={animation.id} style={style?.section}>
            {appVersion}
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
