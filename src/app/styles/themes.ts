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
    
    --bodyBackground: #000000;
    --mainBackground: #000011;
    --loadingSpinner: #1c4c5b;
    --titleHeading: #ffffff;
    --questionHeading: #00ffff;
    --actionLink: #ffff00;
    --imageShadow: #a5a5c8cc;
    --scoreLabel: #00ffff;
    --scoreValue: #ffff00;
    --bonus: #00ff00;
    --noBonus: #ff0000;
    --progress: #ffffffbb;
    --buttonCorrectBackground: #007700;
    --buttonCorrectText: #ffffff;
    --buttonDimmedBackground: #44447755;
    --buttonDimmedText: #ffffff55;
    --buttonDisabledBackground: #44447755;
    --buttonDisabledText: #ffffff55;
    --buttonNormalBackground: #444477;
    --buttonNormalText: #ffffff;
    --buttonWrongBackground: #ff0000;
    --buttonWrongText: #ffffff;
    --buttonRevealBackground: #550055;
    --buttonRevealText: #ffff00;
};

export const LightTheme: Theme = {
    NAME: Themes.Light,
    bodyBackground: "#ffffff",
    mainBackground: "#ffffee",
};
