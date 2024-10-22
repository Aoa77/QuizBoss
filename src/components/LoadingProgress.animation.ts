import { LoadingProgressConfig } from "./LoadingProgress.config";
import { ComponentAnimation } from "../app/App.config";

export class LoadingProgressAnimation extends ComponentAnimation<LoadingProgressConfig> {
    ///
    public constructor(config: LoadingProgressConfig) {
        super(config);
    }
}
