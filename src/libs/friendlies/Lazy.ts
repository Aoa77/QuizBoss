export class Lazy<T> {
    private _value: T | null = null;

    public constructor(private readonly _factory: () => T) {}

    public get value(): T {
        return this._value ?? (this._value = this._factory());
    }
}

