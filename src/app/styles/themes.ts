export enum Themes {
    Dark = "Dark",
    Light = "Light",
}

export interface Theme {
    NAME: string;
    bodyBackground: string;
    mainBackground: string;
}

export const DarkTheme: Theme = {
    NAME: Themes.Dark,
    bodyBackground: "#000000",
    mainBackground: "#000011",
};

export const LightTheme: Theme = {
    NAME: Themes.Light,
    bodyBackground: "#ffffff",
    mainBackground: "#ffffee",
};
