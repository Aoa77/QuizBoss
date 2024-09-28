import { setGlobalSpeed } from "../xobjs/Xanimation";

//
let _initialized: boolean = false;

export function useAnimationSpeed(speed: number): void {
    if (_initialized) {
        return;
    }
    _initialized = true;
    setGlobalSpeed(speed);
}
