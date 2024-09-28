import { AnimeParams } from "animejs";
import { runAnimation } from "./Xanimation";

export abstract class Xref {
    public readonly type: string;
    public readonly id: string;
    public readonly idSelector: string;
    constructor(type: string, id: string) {
        this.type = type;
        this.id = id;
        this.idSelector = `#${id}`;
    }

    public async runAnimation(xp: AnimeParams): Promise<void> {
        xp.targets = this.idSelector;
        await runAnimation(xp);
    }
}
