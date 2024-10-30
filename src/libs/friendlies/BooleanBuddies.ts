export function parseBoolean(
    value: string | undefined | null,
    defaultValue: boolean,
): boolean {
    if (!value) {
        return defaultValue;
    }
    switch (value.toUpperCase().trim()) {
        case "TRUE":
            return true;
        case "FALSE":
            return false;
        default:
            return defaultValue;
    }
}

export function isBooleanNullOrUndefined(value?: boolean): boolean {
    return value === null || value === undefined;
}
