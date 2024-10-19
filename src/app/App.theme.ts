import { Themes } from "../models/Themes";

export async function applyTheme(theme: Themes): Promise<void> {
    // use fetch to load the theme file
    const response = await fetch(`themes/App.theme.${theme}.css`, {
        headers: {
            "Content-Type": "text/css",
            Accept: "text/css",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch theme: ${theme}`);
    }
    const text = await response.text();

    // parse the theme file and set the theme variables
    // read each line and take action on the ones that start with "--"
    const lines = text.split("\n");
    for (const line of lines) {
        const data = line.trim();
        if (!data.startsWith("--")) {
            continue;
        }
        const split = data.split(":");
        const key = split[0].trim();
        const value = split[1].trim().split('"')[1].trim();
        console.debug({key, value});
        setThemeVar(key, value);
    }
}

export function getThemeVar(key: string): string {
    key = normalizeKey(key);
    return getComputedStyle(document.documentElement)
        .getPropertyValue(`--${key}`)
        .trim();
}

function setThemeVar(key: string, value: string) {
    key = normalizeKey(key);
    document.documentElement.style.setProperty(`--${key}`, value.trim());
}

function normalizeKey(key: string) {
    key = key.trim();
    if (key.startsWith("--")) {
        key = key.substring(2);
    }
    if (!key.startsWith("THEME_")) {
        key = `THEME_${key}`;
    }
    return key;
}
