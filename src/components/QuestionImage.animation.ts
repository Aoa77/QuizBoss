import { ComponentAnimation } from "../app/App.config";
import { QuestionImageConfig } from "./QuestionImage.config";

export class QuestionImageAnimation extends ComponentAnimation<QuestionImageConfig> {
    ///
    public constructor(config: QuestionImageConfig) {
        super(config);
    }

    ///
    public async begin(): Promise<void> {
        await this.fadeIn.run();
    }

    ///
    public async end(): Promise<void> {
        await this.scaleTo({ value: 0 }).instance.run();
        this.opacity = 0;
        this.scale = 1;
    }
}
