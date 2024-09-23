import anime from "animejs";
import { AnimeParams } from "animejs";
import Duration from "../../core/timing/Duration";
import timeCalc from "../../core/timing/timeCalc";
import { XrefBase } from "../../core/xrefs/classes";

export function animeX(params: AnimeParams): Promise<void> {
    return new Promise((resolve) => {
        const complete = () => resolve();
        anime({ ...params, complete });
    });
}

export function createAnimeParams(
    xref: XrefBase,
    params: AnimeParams,
    time?: Duration,
): AnimeParams {
    time ??= {};
    params = {
        ...params,
        duration: timeCalc(time),
        targets: xref.idSelector,
    };
    return params;
}
