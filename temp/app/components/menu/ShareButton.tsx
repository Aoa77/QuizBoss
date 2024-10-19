import { ThemeVars } from "../../../../src/libs/theme-vars/ThemeVars";

export function ShareButton() {
    const svgSize = 48;
    const viewBox = `0 0 ${svgSize} ${svgSize}`;
    const strokeWidth = 4;

    return (
        <button className="icon" onPointerDown={onPointerDown}>
            <svg
                width={svgSize}
                height={svgSize}
                viewBox={viewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17.18 27.02L30.84 34.98M30.82 13.02L17.18 20.98M42 10C42 13.3137 39.3137 16 36 16C32.6863 16 30 13.3137 30 10C30 6.68629 32.6863 4 36 4C39.3137 4 42 6.68629 42 10ZM18 24C18 27.3137 15.3137 30 12 30C8.68629 30 6 27.3137 6 24C6 20.6863 8.68629 18 12 18C15.3137 18 18 20.6863 18 24ZM42 38C42 41.3137 39.3137 44 36 44C32.6863 44 30 41.3137 30 38C30 34.6863 32.6863 32 36 32C39.3137 32 42 34.6863 42 38Z"
                    stroke={ThemeVars.get("iconColor")}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}

function onPointerDown() {
    if (!navigator.share) {
        console.error("Web Share API is not supported in this browser.");
        return;
    }

    navigator
        .share({
            title: document.title,
            text: "Hello World",
            url: window.location.href,
        })
        .then(() =>
            ////////////
            console.info("navigator.share() succeeded."),
        )
        .catch((error) =>
            ////////////
            console.error("navigator.share() failed.", error),
        );
}
