let _speedMultiplier: number = 0;

export function getSpeedMultiplier(): number {
    if (_speedMultiplier <= 0) {
        throw new Error("Speed multiplier not set");
    }
    return _speedMultiplier;
}

export function setSpeedMultiplier(speedMultiplier: number): void {
    if (_speedMultiplier > 0) {
        throw new Error("Speed multiplier already set");
    }
    _speedMultiplier = speedMultiplier;
    console.debug(`Set speed multiplier: ${_speedMultiplier}`);
}
