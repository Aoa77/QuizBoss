let _initialized: boolean = false;
let _globalSpeedSet: boolean = false;
let _globalSpeed: number = 100;

export function useGlobalAnimation(speed: number): void {
    if (_initialized) {
        return;
    }
    _initialized = true;
    setGlobalSpeed(speed);
}

export function getGlobalSpeed(): number {
    return _globalSpeed;
}

function setGlobalSpeed(speed: number): void {
    if (_globalSpeedSet) {
        throw new Error("Global speed has already been set.");
    }
    _globalSpeed = speed;
    _globalSpeedSet = true;
}
