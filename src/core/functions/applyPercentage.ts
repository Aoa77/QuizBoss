
export function applyPercentage(value: number, percentage: number): number {
    return value * (percentage / 100);
}


export function applyTimePercentage(value: number, percentage: number): number {
    return value / (percentage / 100);
}