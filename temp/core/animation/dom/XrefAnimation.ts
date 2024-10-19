import { TaskGroup } from "../../../../src/libs/anime+/Task";
import { wait } from "../wait";
import { Xref } from "./xref";

export class XrefAnimation {
    private readonly _xref: Xref;
    private readonly _fadeDuration: number;
    private readonly _scaleDuration: number;

    constructor(xref: Xref, fadeDuration: number, scaleDuration: number) {
        this._xref = xref;
        this._fadeDuration = fadeDuration;
        this._scaleDuration = scaleDuration;
    }

    public async fadeIn() {
        await this._xref.fadeIn({ duration: this._fadeDuration });
    }

    public async fadeOut() {
        await this._xref.fadeOut({ duration: this._fadeDuration });
    }

    public async scaleOut() {
        const asyncGroup = new TaskGroup();
        asyncGroup.add(
            this._xref.scaleTo({
                scale: 0,
                duration: this._scaleDuration * 3,
             //   easing: EASING.easeInOutBack,
            }),
        );
        asyncGroup.add(
            wait(this._scaleDuration * 1.25).then(() =>
                this._xref.fadeOut({ duration: this._fadeDuration }),
            ),
        );
        await asyncGroup.all();
        await this._xref.scaleImmediately(1);
    }
}
