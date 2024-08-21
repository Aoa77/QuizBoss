export function assertInteger(value: number | null | undefined): number {
    if (value === null || value === undefined) {
        throw new Error("Invalid integer parameter");
    }
    if (!Number.isInteger(value)) {
        throw new Error("Invalid integer parameter");
    }
    return value;
}

export function booleanAll(values: boolean[]): boolean {
    return values.every((value) => value);
}

export function delay(ms: number | null | undefined): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, assertInteger(ms)));
}

export function randomInteger(
    min: number | null | undefined,
    max: number | null | undefined,
): number {
    min = assertInteger(min);
    max = assertInteger(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const HIDDEN = "hidden";
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
