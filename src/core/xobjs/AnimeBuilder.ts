import { AnimeParams } from "animejs";
import { Xref } from "./Xref";

/////////

export interface AnimationBuilder {
    name: string;
    build: (xref: Xref) => AnimeParams;
}
