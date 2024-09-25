import { AnimationBuilder } from "./AnimeBuilder";
import { WaitTime } from "./WaitTime";



export interface AnimationFactoryParams {
    speedMultiplier: number;
    animationBuilders: AnimationBuilder[];
    waitTimes: WaitTime[];
}
