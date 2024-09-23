import { AnimeParams } from "animejs";
import { XrefBase } from "../elements/xref";

/////////

export interface AnimationBuilder {
    name: string;
    build: (xref: XrefBase) => AnimeParams;
}
