import { AnimationFactory } from "../xobjs/AnimationFactory";
import { AnimationBuilder } from "../xobjs/AnimeBuilder";

export function getAnimationBuilder(name: string): AnimationBuilder {
    const builder = AnimationFactory.instance.builders.get(name);
    if (!builder) {
        throw new Error(`Animation builder not found: ${name}`);
    }
    return builder;
}
