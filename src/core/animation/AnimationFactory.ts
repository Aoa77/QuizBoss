import { AnimationBuilder } from "./AnimeBuilder";

export class AnimationFactory extends Map<string, AnimationBuilder> {
    ////
    public static readonly instance = new AnimationFactory();

    ////
    constructor() {
        super();
    }
}
