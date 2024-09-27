export class AnimationFactory {
    
    public readonly speedMultiplier: number = 0;

    constructor(speedMultiplier: number) {
        this.speedMultiplier = speedMultiplier;
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
