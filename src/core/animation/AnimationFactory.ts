import { AnimationBuilder } from "./AnimeBuilder";


export class AnimationFactory extends Map<string, AnimationBuilder> {
    constructor() {
        super();
    }
}
