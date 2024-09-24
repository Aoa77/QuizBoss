import { AnimationBuilder } from "./AnimeBuilder";
import { AnimationFactory } from "./AnimationFactory";

/////

export function getAnimationBuilder(name: string): AnimationBuilder {
    const builder = AnimationFactory.instance.get(name);
    if (!builder) {
        throw new Error(`Animation builder not found: ${name}`);
    }
    return builder;
}
