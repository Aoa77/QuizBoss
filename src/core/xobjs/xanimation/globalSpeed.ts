let _globalSpeedSet: boolean = false;
let _globalSpeed: number = 100;

export function getGlobalSpeed(): number {
    return _globalSpeed;
}

export function setGlobalSpeed(speed: number): void {
    if (_globalSpeedSet) {
        throw new Error("Global anime multipliers have already been set.");
    }
    _globalSpeed = speed;
    _globalSpeedSet = true;
}
