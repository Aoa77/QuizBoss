import { AnimationBuilder } from "./AnimeBuilder";
import { WaitTime } from "./WaitTime";

class AnimationBuilders extends Map<string, AnimationBuilder> {
    constructor() {
        super();
    }
}

class WaitTimes extends Map<string, WaitTime> {
    constructor() {
        super();
    }
}

export class AnimationFactory {
    
    public readonly speedMultiplier: number = 0
    public readonly builders: AnimationBuilders;
    public readonly waitTimes: WaitTimes;

    constructor(speedMultiplier: number) {
        this.speedMultiplier = speedMultiplier;
        this.builders = new AnimationBuilders();
        this.waitTimes = new WaitTimes();
    }

    private static _instance: AnimationFactory | null = null;
    
    public static get instance(): AnimationFactory {
        if (!this._instance) {
            throw new Error("AnimationFactory not initialized.");
        }
        return this._instance;
    }

    public static init(speedMultiplier: number): void {
        if (this._instance) {
            throw new Error("AnimationFactory already initialized.");
        }
        this._instance = new AnimationFactory(speedMultiplier);
    }
}
