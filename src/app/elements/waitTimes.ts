export const TIME = {
    BLINK_RATE: "BLINK_RATE",
    BRIEF_PAUSE: "BRIEF_PAUSE",
    DEMO_INPUT_DELAY: "DEMO_INPUT_DELAY",
    LOADING_POLL: "LOADING_POLL",
    LOADING_THROTTLE: "LOADING_THROTTLE",
    LONG_PAUSE: "LONG_PAUSE",
    PAUSE: "PAUSE",
    POST_TITLE_DELAY: "POST_TITLE_DELAY",
    PRE_TITLE_DELAY: "PRE_TITLE_DELAY",
    VERY_LONG_PAUSE: "VERY_LONG_PAUSE",
};

export const DURATION = {
    BLINK_RATE: 420,
    BRIEF_PAUSE: 222,
    DEMO_INPUT_DELAY: 680,
    FADE: 270,
    LOADING_POLL: 50,
    LOADING_THROTTLE: 25,
    LONG_PAUSE: 4200,
    PAUSE: 1600,
    POST_TITLE_DELAY: 500,
    PRE_TITLE_DELAY: 500,
    SCALE: 370,
    VERY_LONG_PAUSE: 4200000,
};

export const waitTimes = [
    {
        name: TIME.BLINK_RATE,
        duration: DURATION.BLINK_RATE,
    },
    {
        name: TIME.BRIEF_PAUSE,
        duration: DURATION.BRIEF_PAUSE,
    },
    {
        name: TIME.DEMO_INPUT_DELAY,
        duration: DURATION.DEMO_INPUT_DELAY,
    },
    {
        name: TIME.LOADING_POLL,
        duration: DURATION.LOADING_POLL,
    },
    {
        name: TIME.LOADING_THROTTLE,
        duration: DURATION.LOADING_THROTTLE,
    },
    {
        name: TIME.LONG_PAUSE,
        duration: DURATION.LONG_PAUSE,
    },
    {
        name: TIME.PAUSE,
        duration: DURATION.PAUSE,
    },
    {
        name: TIME.POST_TITLE_DELAY,
        duration: DURATION.POST_TITLE_DELAY,
    },
    {
        name: TIME.PRE_TITLE_DELAY,
        duration: DURATION.PRE_TITLE_DELAY,
    },
    {
        name: TIME.VERY_LONG_PAUSE,
        duration: DURATION.VERY_LONG_PAUSE,
    },
];

