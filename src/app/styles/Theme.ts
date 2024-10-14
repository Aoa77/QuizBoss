export interface Theme {
    NAME: string;
    bodyBackground: string;
    mainBackground: string;
    loadingSpinner: string;
    titleHeading: string;
    questionHeading: string;
    actionLink: string;
    imageShadow: string;
    scoreLabel: string;
    scoreValue: string;
    bonus: string;
    noBonus: string;
    progress: string;
    buttonCorrectBackground: string;
    buttonCorrectText: string;
    buttonDimmedBackground: string;
    buttonDimmedText: string;
    buttonDisabledBackground: string;
    buttonDisabledText: string;
    buttonNormalBackground: string;
    buttonNormalText: string;
    buttonWrongBackground: string;
    buttonWrongText: string;
    buttonRevealBackground: string;
    buttonRevealText: string;
    
    iconBackground: string;
    iconForeground: string;

    iconSize: string;
    iconStroke: string;
}

export const ICON = {
    SIZE: "24",
    STROKE: "2",
}

export function applyTheme(theme: Theme): void {
    for (const [key, value] of Object.entries(theme)) {
        cssVar(key, value);
    }
}

function cssVar(key: string, value: string) {
    document.documentElement.style.setProperty(`--${key}`, value);
}
