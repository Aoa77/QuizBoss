class ThemeMap extends Map<string, VarMap> {}
class VarMap extends Map<string, string> {}

export class ThemeVars {
    private static _map: ThemeMap = new ThemeMap();
    private static _names: string[] = [];
    private static _vars: string[] = [];

    public static async config<TName extends string, TVar extends string>(
        nameType: unknown,
        varType: unknown,
        path: string,
    ) {
        if (this._names.length > 0 || this._vars.length > 0) {
            throw new Error("ThemeVars already configured");
        }

        this._names = Object.values(
            nameType as { [key: string]: TName },
        ) as string[];

        this._vars = Object.values(
            varType as { [key: string]: TVar },
        ) as string[];

        for (const name of this._names) {
            const map = new VarMap();
            for (const variable of this._vars) {
                map.set(variable, "?");
            }
            this._map.set(name, map);
        }

        path = path.trim().replace(/\/$/, "");
        for (const name of this._names) {
            //
            const file = `${path}/tv.${name}.css`;
            const response = await fetch(file, {
                headers: {
                    "Content-Type": "text/css",
                    Accept: "text/css",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch theme: ${name}`);
            }

            const raw = await response.text();
            const lines = raw.split("\n");

            for (const line of lines) {
                const data = line.trim();
                if (!data.startsWith("--")) {
                    continue;
                }
                const split = data.split(":");
                const key = split[0].trim();
                const value = split[1].trim().split('"')[1].trim();

                console.debug({ key, value });

                if (!this._vars.includes(key)) {
                    console.error(this._map);
                    throw new Error(`Unknown variable: ${key}`);
                }
                this._map.get(name)!.set(key, value);
            }

            for (const tvar of this._vars) {
                if ("?" === this._map.get(name)!.get(tvar)) {
                    console.error(this._map);
                    throw new Error(`Missing variable: ${tvar}`);
                }
            }
        }
    }

    public static async apply(themeName: string): Promise<void> {
        const map = this._map.get(themeName);
        if (!map) {
            throw new Error(`Unknown theme: ${themeName}`);
        }
        for (const [key, value] of map) {
            this.setValue(key, value);
        }
    }

    public static getRef(key: string): string {
        if (!this._vars.includes(key)) {
            throw new Error(`Unknown variable: ${key}`);
        }
        return `var(${key})`;
    }

    public static getValue(key: string): string {
        if (!this._vars.includes(key)) {
            throw new Error(`Unknown variable: ${key}`);
        }
        return getComputedStyle(document.documentElement)
            .getPropertyValue(key)
            .trim();
    }

    public static setValue(key: string, value: string): void {
        if (!this._vars.includes(key)) {
            throw new Error(`Unknown variable: ${key}`);
        }
        document.documentElement.style.setProperty(key, value.trim());
    }
}


