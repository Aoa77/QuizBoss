///
let _speed: number = 1;

///
export function useSpeed(speed?: number): number {
    if (speed) {
        _speed = speed;
    }
    return _speed;
}

///
export function getSpeed(): number {
    return _speed;
}
