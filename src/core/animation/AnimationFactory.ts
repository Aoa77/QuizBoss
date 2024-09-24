import { AnimationBuilder } from "./AnimeBuilder";
import { WaitTime } from "./WaitTime";

class AnimationBuilders extends Map<string, AnimationBuilder> {
    constructor() {
        super();
    }
}

class WaitTimes extends Map<string, WaitTime> {
    constructor() {
        super();
    }
}

export class AnimationFactory {
    public readonly builders: AnimationBuilders;
    public readonly waitTimes: WaitTimes;

    constructor(builders: AnimationBuilders, waitTimes: WaitTimes) {
        this.builders = builders;
        this.waitTimes = waitTimes;
    }

    public static readonly instance = new AnimationFactory(
        new AnimationBuilders(),
        new WaitTimes(),
    );
}
