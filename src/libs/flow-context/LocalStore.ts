import { LocalStoreItem } from "./LocalStore.item";

export class LocalStore {
    public static readonly strings: LocalStoreItem<string> = new LocalStoreItem(
        (item: string) => item,
        (value: string) => value,
    );

    public static readonly numbers: LocalStoreItem<number> = new LocalStoreItem(
        (item: string) => parseFloat(item),
        (value: number) => value.toString(),
    );

    public static readonly booleans: LocalStoreItem<boolean> = new LocalStoreItem(
        (item: string) => item === "true",
        (value: boolean) => value.toString(),
    );

    public static readonly json: LocalStoreItem<unknown> = new LocalStoreItem(
        (item: string) => JSON.parse(item),
        (value: unknown) => JSON.stringify(value),
    );

    public static readonly dates: LocalStoreItem<Date> = new LocalStoreItem(
        (item: string) => new Date(item),
        (value: Date) => value.toISOString(),
    );
}
