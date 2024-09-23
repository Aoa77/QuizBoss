import { AnimationBuilder } from "./AnimeBuilder";
import { factory } from "./factory";

/////

export function getAnimationBuilder(name: string): AnimationBuilder {
    const builder = factory.get(name);
    if (!builder) {
        throw new Error(`Animation builder not found: ${name}`);
    }
    return builder;
}
