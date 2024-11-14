import { useMemo } from "react";
import { useAppContext } from "../app/context";
import { ANIM } from "../code/animation";
import { SectionStyle, TV, ThemeFont } from "../code/style";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

export function AppVersion() {
    ////
    const id = useAnimeRef(ANIM.AppVersion).id;
    const style = useStyle()?.section;
    const { state } = useAppContext();
    const { appVersion } = state;

    ///
    return useMemo(() => {
        console.debug("AppVersion", { id, style, appVersion });
        const v = appVersion.split(" ");
        return (
            <section id={id} style={style}>
                <div>{v[0]} {v[1]}</div>
                <div>{v[2]} {v[3]}</div>
            </section>
        );
    }, [id, style, appVersion]);
}

function useStyle(): SectionStyle | null {
    return useMemo(() => {
        const style: SectionStyle = {
            section: {},
        };

        ///
        style.section = {
            color: ThemeVars.getRef(TV, TV.QuizProgress_color),
            fontFamily: ThemeFont.mono,
            fontSize: CssUnit.rem(2.3),
            fontWeight: "bold",
            marginTop: CssUnit.cqh(28),
        };

        ///
        return style;
    }, []);
}
