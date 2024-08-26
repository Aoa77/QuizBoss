 
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
