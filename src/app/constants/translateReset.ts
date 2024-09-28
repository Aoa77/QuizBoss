import { AnimeParams } from "animejs";


export function translateReset(): AnimeParams {
    return {
        duration: 1,
        easing: "linear",
        translateY: "0",
    };
}
