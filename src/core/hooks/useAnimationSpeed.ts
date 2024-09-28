import { setGlobalSpeed } from "../xobjs/xanimation/globalSpeed";

//
let _initialized: boolean = false;

export function useAnimationSpeed(speed: number): void {
    if (_initialized) {
        return;
    }
    _initialized = true;
    setGlobalSpeed(speed);
}
