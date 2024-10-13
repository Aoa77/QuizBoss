export function applyTheme(theme: Theme): void {
    for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(`--${key}`, value);
    }
}

export enum ThemeNames {
    Dark = "Dark",
    Light = "Light",
}

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
    iconStroke: string;
}

export const DarkTheme: Theme = {
    NAME: ThemeNames.Dark,
    bodyBackground: "#000000",
    mainBackground: "#000011",
    loadingSpinner: "#1c4c5b",
    titleHeading: "#ffffff",
    questionHeading: "#00ffff",
    actionLink: "#ffff00",
    imageShadow: "#a5a5c8cc",
    scoreLabel: "#00ffff",
    scoreValue: "#ffff00",
    bonus: "#00ff00",
    noBonus: "#ff0000",
    progress: "#ffffffbb",
    buttonCorrectBackground: "#007700",
    buttonCorrectText: "#ffffff",
    buttonDimmedBackground: "#44447755",
    buttonDimmedText: "#ffffff55",
    buttonDisabledBackground: "#44447755",
    buttonDisabledText: "#ffffff55",
    buttonNormalBackground: "#444477",
    buttonNormalText: "#ffffff",
    buttonWrongBackground: "#ff0000",
    buttonWrongText: "#ffffff",
    buttonRevealBackground: "#550055",
    buttonRevealText: "#ffff00",
    iconStroke: "#ffffffbb",
};

export const LightTheme: Theme = {
    NAME: ThemeNames.Light,
    bodyBackground: "#ffffff",
    mainBackground: "#cccccc",
    loadingSpinner: "#ffffff",
    titleHeading: "#000000",
    questionHeading: "#0000ff",
    actionLink: "#0000ff",
    imageShadow: "#676767cc",
    scoreLabel: "#000077",
    scoreValue: "#0000ff",
    bonus: "#009900",
    noBonus: "#ff0000",
    progress: "#00000044",
    buttonCorrectBackground: "#007700",
    buttonCorrectText: "#ffffff",
    buttonDimmedBackground: "#44447755",
    buttonDimmedText: "#ffffff55",
    buttonDisabledBackground: "#44447755",
    buttonDisabledText: "#ffffff55",
    buttonNormalBackground: "#444477",
    buttonNormalText: "#ffffff",
    buttonWrongBackground: "#ff0000",
    buttonWrongText: "#ffffff",
    buttonRevealBackground: "#550055",
    buttonRevealText: "#ffff00",
    iconStroke: "#000000bb",
};

export const Themes = [
    DarkTheme, ///////////////////////////
    LightTheme, ////////////////////////////
];
