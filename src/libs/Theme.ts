export class Theme {
    private static _themeDirectory: string | null = null;

    public static config(themeDirectory: string): void {
        // remove any trailing slashes
        themeDirectory = themeDirectory.trim().replace(/\/$/, "");
        Theme._themeDirectory = themeDirectory;
    }

    public static async apply(themeName: string): Promise<void> {
        //
        // if no theme directory is set, throw an error
        if (!Theme._themeDirectory) {
            throw new Error("Theme directory is not set");
        }

        // use fetch to load the theme file
        const response = await fetch(`${this._themeDirectory}/theme.${themeName}.css`, {
            headers: {
                "Content-Type": "text/css",
                Accept: "text/css",
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch theme: ${themeName}`);
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
            console.debug({ key, value });
            Theme.setColor(key, value);
        }
    }

    public static setColor(key: string, value: string): void {
        key = Theme.normalizeKey(key);
        document.documentElement.style.setProperty(`--${key}`, value.trim());
    }

    public static getColor(key: string): string {
        key = Theme.normalizeKey(key);
        return getComputedStyle(document.documentElement)
            .getPropertyValue(`--${key}`)
            .trim();
    }

    private static normalizeKey(key: string): string {
        key = key.trim();
        if (key.startsWith("--")) {
            key = key.substring(2);
        }
        if (!key.startsWith("THEME_")) {
            key = `THEME_${key}`;
        }
        return key;
    }
}
