import { AnimeParams } from "animejs";
import { EASING } from "../../core/anime-x/easings";


export function translateReset(): AnimeParams {
    return {
        duration: 1,
        easing: EASING.linear,
        translateY: "0",
    };
}
