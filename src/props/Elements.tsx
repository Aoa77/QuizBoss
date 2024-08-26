export interface Elements {
    buttonsSection: React.MutableRefObject<HTMLDivElement | null>;
    imageSection: React.MutableRefObject<HTMLDivElement | null>;
    loadingSection: React.MutableRefObject<HTMLDivElement | null>;
    progressSection: React.MutableRefObject<HTMLDivElement | null>;
    questionHeading: React.MutableRefObject<HTMLHeadingElement | null>;
    scoreSection: React.MutableRefObject<HTMLDivElement | null>;
    titleHeading: React.MutableRefObject<HTMLHeadingElement | null>;
}

export interface ButtonElement {
    element: JSX.Element;
    ref: React.RefObject<HTMLButtonElement>;
}
