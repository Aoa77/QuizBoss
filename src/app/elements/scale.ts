import { XrefBase } from "../../core/xrefs/classes";
import { animeX, createAnimeParams } from "./animeX";
import { SCALE } from "./constants";

export async function scaleUp(params: {
    xref: XrefBase;
    multiplier?: number;
}): Promise<void> {
    const { xref, multiplier } = params;
    const [scale] = [SCALE.UP];
    const animeParams = createAnimeParams(
        xref,
        { scale },
        { duration: SCALE.DURATION, multiplier },
    );
    await animeX(animeParams);
}

export async function scaleDown(params: {
    xref: XrefBase;
    multiplier?: number;
}): Promise<void> {
    const { xref, multiplier } = params;
    const [scale] = [SCALE.DOWN];
    const animeParams = createAnimeParams(
        xref,
        { scale },
        { duration: SCALE.DURATION, multiplier },
    );
    await animeX(animeParams);
}
