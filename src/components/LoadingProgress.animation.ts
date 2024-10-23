import { LoadingProgressConfig } from "./LoadingProgress.config";
import { ComponentAnimation } from "../app/App.base";

export function createAnimation(
    config: LoadingProgressConfig,
): LoadingProgressAnimation {
    return new LoadingProgressAnimation(config);
}

class LoadingProgressAnimation ///////////////////
    extends ComponentAnimation<LoadingProgressConfig>
{
    ///
    public constructor(config: LoadingProgressConfig) {
        super(config);
    }

    ///
    public async transitionIn(): Promise<void> {
        await this._fade[1].instance.run();
    }

    ///
    public async transitionOut(): Promise<void> {
        await this._fade[0].instance.run();
    }
}
