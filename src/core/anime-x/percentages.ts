export function applyPercentage(value: number, percentage: number): number {
    if (percentage === 100) {
        return value;
    }
    return value * (percentage / 100);
}

export function applyTimePercentage(value: number, percentage: number): number {
    if (percentage === 100) {
        return value;
    }

    return value / (percentage / 100);
}
