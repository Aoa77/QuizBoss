export class Bucket<T> {
    private readonly _reader: (item: string) => T;
    private readonly _writer: (value: T) => string;

    public constructor(params: {
        reader: (item: string) => T;
        writer: (value: T) => string;
    }) {
        this._reader = params.reader;
        this._writer = params.writer;
    }

    public get(key: string, initialValue?: T): T | null {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            if (initialValue === undefined) {
                return null;
            }
            this.set(key, initialValue);
            return initialValue;
        }
        return this._reader(raw);
    }

    public set(key: string, value: T): void {
        const raw = this._writer(value);
        localStorage.setItem(key, raw);
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }
}
