import { AsyncMode } from "./AsyncMode";






export interface AnimeAdjustments {
    localSpeed?: number | null;
    logger?: ((x: unknown) => void) | null;
    mode?: AsyncMode | null;
}
