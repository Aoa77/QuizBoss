import { LoadingProgressConfig } from "./LoadingProgress.config";
import { ComponentAnimation } from "../app/App.config";

export function createAnimation(
    config: LoadingProgressConfig,
): LoadingProgressAnimation {
    return new LoadingProgressAnimation(config);
}

export class LoadingProgressAnimation ///////////////////
    extends ComponentAnimation<LoadingProgressConfig>
{
    ///
    public constructor(config: LoadingProgressConfig) {
        super(config);
    }
}
