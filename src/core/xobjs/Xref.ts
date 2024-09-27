import { getAnimationBuilder } from "../functions/getAnimationBuilder";
import { runAnimation } from "../functions/runAnimation";

export abstract class Xref {
    public readonly type: string;
    public readonly id: string;
    public readonly idSelector: string;
    constructor(type: string, id: string) {
        this.type = type;
        this.id = id;
        this.idSelector = `#${id}`;
    }

    public async animate(name: string, localSpeed: number = 1): Promise<void> {
        const builder = getAnimationBuilder(name);
        if (!name) {
            throw new Error(`Animation builder not found: ${name}`);
        }
        const params = builder.build(this);
        await runAnimation(params, localSpeed);
    }

    public async fadeOut(localSpeed: number = 1): Promise<void> {
        await this.animate("fadeOut", localSpeed);
    }

    public async fadeIn(localSpeed: number = 1): Promise<void> {
        await this.animate("fadeIn", localSpeed);
    }

    public async scaleUp(localSpeed: number = 1): Promise<void> {
        await this.animate("scaleUp", localSpeed);
    }

    public async scaleDown(localSpeed: number = 1): Promise<void> {
        await this.animate("scaleDown", localSpeed);
    }
}
