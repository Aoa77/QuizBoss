export interface Elements {
    buttonsSection: React.MutableRefObject<HTMLDivElement | null>;
    imageSection: React.MutableRefObject<HTMLDivElement | null>;
    loadingSection: React.MutableRefObject<HTMLDivElement | null>;
    progressSection: React.MutableRefObject<HTMLDivElement | null>;
    questionHeading: React.MutableRefObject<HTMLHeadingElement | null>;
    scoreSection: React.MutableRefObject<HTMLDivElement | null>;
    scoreMark: React.MutableRefObject<HTMLSpanElement | null>;
    titleHeading: React.MutableRefObject<HTMLHeadingElement | null>;
}

export interface ButtonElement {
    element: JSX.Element;
    ref: React.RefObject<HTMLButtonElement>;
}

export function hideElementRef(
    elementRef: React.MutableRefObject<HTMLDivElement | null>,
) {
    hideElement(elementRef.current);
}

export function showElementRef(
    elementRef: React.MutableRefObject<HTMLDivElement | null>,
) {
    showElement(elementRef.current);
}

export function hideElement(element: HTMLElement | null | undefined) {
    if (!element) {
        return;
    }
    element.classList.add("hidden");
}

export function showElement(element: HTMLElement | null | undefined) {
    if (!element) {
        return;
    }
    element.classList.remove("hidden");
}
