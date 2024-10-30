export enum DemoMode {
    OFF = "OFF",
    RANDOM = "RANDOM",
    RIGHT = "RIGHT",
    WRONG = "WRONG",
}

export function parseDemoMode(
    value: string | undefined | null,
    defaultValue: DemoMode,
): DemoMode {
    if (!value) {
        return defaultValue;
    }
    switch (value.toUpperCase().trim()) {
        case DemoMode.RANDOM:
            return DemoMode.RANDOM;
        case DemoMode.RIGHT:
            return DemoMode.RIGHT;
        case DemoMode.WRONG:
            return DemoMode.WRONG;
        default:
            return defaultValue;
    }
}

export class DEMO {
    public static readonly guess: number[] = [];
}
