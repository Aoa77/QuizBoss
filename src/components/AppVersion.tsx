import { CSSProperties, useMemo } from "react";
import { useAppContext } from "../code/context";
import { ANIM } from "../code/AnimationManager";
import { SectionStyle, TV, ThemeFont } from "../code/style";
import { useAnimeRef } from "../libs/anime-context/hooks";
import { CssUnit } from "../libs/theme-vars/CssUnit";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";

export function AppVersion() {
    ////
    const id = useAnimeRef(ANIM.AppVersion).id;
    const style = useStyle();
    const { state } = useAppContext();
    const { appVersion } = state;

    ///
    return useMemo(() => {
        const v = appVersion.split(" ");
        console.log("AppVersion", { id, style, appVersion, v });
        return (
            <section id={id} style={style?.section}>
                <div>{v[0]}</div>
                <div style={style?.versionDate}>
                    {v[1]} {v[2]}
                </div>
            </section>
        );
    }, [id, style, appVersion]);
}

interface Style extends SectionStyle {
    versionDate: CSSProperties;
}

function useStyle(): Style | null {
    return useMemo(() => {
        const style: Style = {
            section: {},
            versionDate: {},
        };

        ///
        style.section = {
            color: ThemeVars.getRef(TV, TV.QuizProgress_color),
            fontFamily: ThemeFont.mono,
            fontSize: CssUnit.rem(2.3),
            fontWeight: "bold",
            marginTop: CssUnit.cqh(22),
        };

        ///
        style.versionDate = {
            marginTop: CssUnit.cqh(1),
        };

        ///
        return style;
    }, []);
}
