class ThemeMap extends Map<string, VarMap> {}
class VarMap extends Map<string, string> {}

export class ThemeVars {
    private static _map: ThemeMap = new ThemeMap();
    private static _names: string[] | null = null;
    private static _vars: string[] | null = null;

    public static async config<TName extends string, TVar extends string>(
        nameType: unknown,
        varType: unknown,
        path: string,
    ) {
        this._names = this.initNames<TName>(nameType);
        this._vars = this.initVars<TVar>(varType);

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
                const value = split[1].trim().replace(/;$/, "");

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

    public static apply(themeName: string): void {
        const map = this._map.get(themeName);
        if (!map) {
            throw new Error(`Unknown theme: ${themeName}`);
        }
        for (const [key, value] of map) {
            this.setValue(key, value);
        }
    }

    public static getRef<TVar extends string>(
        varType: unknown,
        key: string,
    ): string {
        this._vars = this.initVars<TVar>(varType);
        if (!this._vars.includes(key)) {
            throw new Error(`Unknown variable: ${key}`);
        }
        return `var(${key})`;
    }

    public static getValue(key: string): string {
        if (true !== this._vars?.includes(key)) {
            throw new Error(`Unknown variable: ${key}`);
        }
        return getComputedStyle(document.documentElement)
            .getPropertyValue(key)
            .trim();
    }

    public static setValue(key: string, value: string): void {
        if (true !== this._vars?.includes(key)) {
            throw new Error(`Unknown variable: ${key}`);
        }
        document.documentElement.style?.setProperty(key, value.trim());
    }

    private static initNames<TName extends string>(
        nameType: unknown,
    ): string[] {
        this._names ??= Object.values(
            nameType as { [key: string]: TName },
        ) as string[];
        return this._names;
    }

    private static initVars<TVar extends string>(
        varType: unknown,
    ): string[] {
        this._vars ??= Object.values(
            varType as { [key: string]: TVar },
        ) as string[];
        return this._vars
    }
}
