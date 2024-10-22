import { Bucket } from "./LocalStore.bucket";

export class LocalStore {
    public static readonly strings: Bucket<string> = new Bucket({
        reader: (item: string) => item,
        writer: (value: string) => value,
    });

    public static readonly numbers: Bucket<number> = new Bucket({
        reader: (item: string) => parseFloat(item),
        writer: (value: number) => value.toString(),
    });

    public static readonly booleans: Bucket<boolean> = new Bucket({
        reader: (item: string) => item === "true",
        writer: (value: boolean) => value.toString(),
    });

    public static readonly json: Bucket<unknown> = new Bucket({
        reader: (item: string) => JSON.parse(item),
        writer: (value: unknown) => JSON.stringify(value),
    });

    public static readonly dates: Bucket<Date> = new Bucket({
        reader: (item: string) => new Date(item),
        writer: (value: Date) => value.toISOString(),
    });
}
