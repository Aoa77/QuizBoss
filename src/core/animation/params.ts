export interface BaseParams {
    delay?: number;
    duration?: number;
    endDelay?: number;
    easing?: string;
}

export interface FadeParams extends BaseParams {
    opacity?: number;
}

export interface ScaleParams extends BaseParams {
    scale: number;
}
