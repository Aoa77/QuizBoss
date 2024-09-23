import { XrefBase } from "../../core/xrefs/classes";
import { animeX, createAnimeParams } from "./animeX";
import { FADE } from "./constants";

export async function fadeIn(params: {
    xref: XrefBase;
    multiplier?: number;
}): Promise<void> {
    const { xref, multiplier } = params;
    const [easing, opacity] = [FADE.EASING, FADE.IN];
    const animeParams = createAnimeParams(
        xref,
        { easing, opacity },
        { duration: FADE.DURATION, multiplier },
    );
    await animeX(animeParams);
}

export async function fadeOut(params: {
    xref: XrefBase;
    multiplier?: number;
}): Promise<void> {
    const { xref, multiplier } = params;
    const [easing, opacity] = [FADE.EASING, FADE.OUT];
    const animeParams = createAnimeParams(
        xref,
        { easing, opacity },
        { duration: FADE.DURATION, multiplier },
    );
    await animeX(animeParams);
}
