import { AnimeParams } from "animejs";
import { runAnimation } from "./xanimation/runAnimation";

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
        document.getElementById("buttonArea")!.style.backgroundColor = "#000001";
        document.getElementById("buttonArea")!.style.backgroundColor = "#000000";
        await this._awaiter;
        xp.targets = this.idSelector;
        await runAnimation(xp);
    }
    public startAnimation(xp: AnimeParams): void {
        this._awaiter = this.runAnimation(xp);
    }
    private _awaiter: Promise<void> = Promise.resolve();
}
