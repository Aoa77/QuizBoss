
export interface TransitionParams<T> {
    value: T | T[];
    delay: number;
    duration: number;
    endDelay: number;
    easing: string;
}
