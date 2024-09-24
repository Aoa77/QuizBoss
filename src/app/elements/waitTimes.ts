export const TIME = {
    PRE_TITLE_DELAY: "PRE_TITLE_DELAY",
    POST_TITLE_DELAY: "POST_TITLE_DELAY",
    DEMO_INPUT_DELAY: "DEMO_INPUT_DELAY",
    LOADING_POLL: "LOADING_POLL",
    LOADING_THROTTLE: "LOADING_THROTTLE",
    REVEAL_BUTTON_STATUS: "REVEAL_BUTTON_STATUS",
};

export const waitTimes = [
    {
        name: TIME.DEMO_INPUT_DELAY,
        duration: 500,
    },
    {
        name: TIME.LOADING_POLL,
        duration: 1000,
    },
    {
        name: TIME.LOADING_THROTTLE,
        duration: 1000,
    },
    {
        name: TIME.POST_TITLE_DELAY,
        duration: 2000,
    },
    {
        name: TIME.PRE_TITLE_DELAY,
        duration: 2000,
    },
    {
        name: TIME.REVEAL_BUTTON_STATUS,
        duration: 1000,
    },
];
