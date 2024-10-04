import { EASING } from "./easings";

export const PERCENT_100 = 100;

export class AnimationDefaultSettings {
    public fadeDuration: number;
    public fadeEasing: string;
    public scaleDuration: number;
    public scaleEasing?: string;
    public waitDuration: number;

    constructor() {
        this.fadeDuration = 280;
        this.fadeEasing = EASING.linear;
        this.scaleDuration = 900;
        this.waitDuration = 2000;
    }

    private static readonly _config: AnimationDefaultSettings =
        new AnimationDefaultSettings();
    public static get config(): AnimationDefaultSettings {
        return AnimationDefaultSettings._config;
    }
}

export class AnimationGlobalSettings {
    public maxOpacity: number;
    public minOpacity: number;
    public speed: number;

    constructor() {
        this.maxOpacity = 1;
        this.minOpacity = 0;
        this.speed = PERCENT_100;
    }

    private static readonly _config: AnimationGlobalSettings =
        new AnimationGlobalSettings();
    public static get config(): AnimationGlobalSettings {
        return AnimationGlobalSettings._config;
    }
}