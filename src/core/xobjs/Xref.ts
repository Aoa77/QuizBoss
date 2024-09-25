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

    public async animate(name: string): Promise<void> {
        const builder = getAnimationBuilder(name);
        if (!name) {
            throw new Error(`Animation builder not found: ${name}`);
        }
        const params = builder.build(this);
        console.info(`Running animation: ${name} with duration: ${params.duration}`);
        await runAnimation(params);
    }
    
    public async fadeOut(): Promise<void> {
        await this.animate("fadeOut");
    }

    public async fadeIn(): Promise<void> {
        await this.animate("fadeIn");
    }
    
    public async scaleUp(): Promise<void> {
        await this.animate("scaleUp");
    }
    
    public async scaleDown(): Promise<void> {
        await this.animate("scaleDown");
    }
}



