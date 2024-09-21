import { AnimeParams } from "animejs";
import { createRef, MutableRefObject } from "react";
import Duration from "../timing/Duration";
import timeCalc from "../timing/timeCalc";
import anime from "animejs";

export default class Xref<T> {
    public readonly id: string;
    public readonly idSelector: string;
    public readonly ref: MutableRefObject<T | null>;

    constructor(id: string) {
        this.id = id;
        this.idSelector = "#" + id;
        this.ref = createRef<T>();
    }

    public get element(): T {
        return this.ref.current as T;
    }

    public createAnimeParams(
        params: AnimeParams,
        time?: Duration,
    ): AnimeParams {
        time ??= {};
        params = {
            ...params,
            duration: timeCalc(time),
            targets: this.idSelector,
        };
        return params;
    }

    public animeX(params: AnimeParams): Promise<void> {
        return new Promise((resolve) => {
            const complete = () => resolve();
            anime({ ...params, complete });
        });
    }
}
