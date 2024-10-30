export class Lazy<T> {
    private _instance: T | null = null;

    public constructor(private readonly _factory: () => T) {}

    public get instance(): T {
        return this._instance ?? (this._instance = this._factory());
    }
}

