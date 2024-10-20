export class LocalStorageCache<T> {
    private readonly _cache: Map<string, T>;
    private readonly _reader: (item: string) => T;
    private readonly _writer: (value: T) => string;

    public constructor(
        reader: (item: string) => T,
        writer: (value: T) => string,
    ) {
        this._cache = new Map();
        this._reader = reader;
        this._writer = writer;
    }

    public read(key: string): T | null {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            return null;
        }
        return this._reader(raw);
    }

    public write(key: string, value: T): void {
        const raw = this._writer(value);
        localStorage.setItem(key, raw);
    }

    public get(key: string, initValue?: T): T {
        const cached = this._cache.get(key);
        if (cached !== undefined) {
            return cached;
        }

        const value = this.read(key);
        if (value === null) {
            if (initValue === undefined) {
                throw new Error(`Key not found: ${key}, and no initValue provided.`);
            }
            this.set(key, initValue);
            return initValue;
        }

        this._cache.set(key, value);
        return value;
    }

    public set(key: string, value: T): void {
        this._cache.set(key, value);
        this.write(key, value);
    }

    public clear(): void {
        this._cache.clear();
    }

    public nuke(): void {
        for (const key of this._cache.keys()) {
            this.remove(key);
        }
    }

    public delete(key: string): void {
        this._cache.delete(key);
    }

    public remove(key: string): void {
        this.delete(key);
        localStorage.removeItem(key);
    }
}
