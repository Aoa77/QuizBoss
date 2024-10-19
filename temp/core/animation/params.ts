export interface BaseParams {
    duration: number;
    easing?: string;
}

export interface FadeParams extends BaseParams {
    opacity?: number;
}

export interface ScaleParams extends BaseParams {
    scale: number;
}

export interface SlideParams extends BaseParams {
    x: number;
    y: number;
}
