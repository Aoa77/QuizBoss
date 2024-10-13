import { QuizState } from "../../models/QuizState";

export function HamburgerIcon(state: QuizState) {
    const { theme } = state.settings;
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 17H19M5 12H19M5 7H19"
                stroke={theme.iconStroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
