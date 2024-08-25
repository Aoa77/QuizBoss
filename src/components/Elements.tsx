export interface Elements {
    buttons: React.MutableRefObject<HTMLDivElement | null>;
    image: React.MutableRefObject<HTMLDivElement | null>;
    loading: React.MutableRefObject<HTMLDivElement | null>;
    progress: React.MutableRefObject<HTMLDivElement | null>;
    question: React.MutableRefObject<HTMLHeadingElement | null>;
    score: React.MutableRefObject<HTMLDivElement | null>;
    title: React.MutableRefObject<HTMLHeadingElement | null>;
}


const HIDDEN = "hidden";

export function hideElementRef(elementRef: React.MutableRefObject<HTMLDivElement | null>) {
    hideElement(elementRef.current);
}

export function showElementRef(elementRef: React.MutableRefObject<HTMLDivElement | null>) {
    showElement(elementRef.current);
}

export function hideElement(element: HTMLElement | null | undefined) {
    if (!element) {
        return;
    }
    element.classList.add(HIDDEN);
}

export function showElement(element: HTMLElement | null | undefined) {
    if (!element) {
        return;
    }
    element.classList.remove(HIDDEN);
}