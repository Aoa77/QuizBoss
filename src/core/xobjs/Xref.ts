import { AnimeParams } from "animejs";
import { runAnimation } from "../functions/runAnimation";
import { AnimeAdjustments } from "./AnimeAdjustments";

export abstract class Xref {
    public readonly type: string;
    public readonly id: string;
    public readonly idSelector: string;
    constructor(type: string, id: string) {
        this.type = type;
        this.id = id;
        this.idSelector = `#${id}`;
    }

    public async runAnimation(
        params: AnimeParams,
        adjustments: AnimeAdjustments | null = null,
    ): Promise<void> {
        params.targets = this.idSelector;
        await runAnimation(params, adjustments);
    }
}
