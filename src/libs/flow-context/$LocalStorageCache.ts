import { LocalStorageCache } from "./LocalStorageCache";

export class $LocalStorageCache {
    public static readonly strings: LocalStorageCache<string> = new LocalStorageCache(
        (item: string) => item,
        (value: string) => value,
    );

    public static readonly numbers: LocalStorageCache<number> = new LocalStorageCache(
        (item: string) => parseFloat(item),
        (value: number) => value.toString(),
    );

    public static readonly booleans: LocalStorageCache<boolean> = new LocalStorageCache(
        (item: string) => item === "true",
        (value: boolean) => value.toString(),
    );

    public static readonly json: LocalStorageCache<unknown> = new LocalStorageCache(
        (item: string) => JSON.parse(item),
        (value: unknown) => JSON.stringify(value),
    );

    public static readonly dates: LocalStorageCache<Date> = new LocalStorageCache(
        (item: string) => new Date(item),
        (value: Date) => value.toISOString(),
    );
}
