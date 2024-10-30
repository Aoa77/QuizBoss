export enum DemoMode {
    OFF = "OFF",
    RANDOM = "RANDOM",
    RIGHT = "RIGHT",
    WRONG = "WRONG",
}

export function parseDemoMode(value: string | undefined | null): DemoMode {
    if (!value) {
        return DemoMode.OFF;
    }
    switch (value.toUpperCase()) {
        case DemoMode.RANDOM:
            return DemoMode.RANDOM;
        case DemoMode.RIGHT:
            return DemoMode.RIGHT;
        case DemoMode.WRONG:
            return DemoMode.WRONG;
        default:
            return DemoMode.OFF;
    }
}

export class DEMO {
    public static readonly guess: number[] = [];
}
