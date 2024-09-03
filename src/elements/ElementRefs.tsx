
export default interface ElementRefs {
    buttonsSection: React.MutableRefObject<HTMLDivElement | null>;
    imageSection: React.MutableRefObject<HTMLDivElement | null>;
    loadingSection: React.MutableRefObject<HTMLDivElement | null>;
    progressSection: React.MutableRefObject<HTMLDivElement | null>;
    questionHeading: React.MutableRefObject<HTMLHeadingElement | null>;
    scoreSection: React.MutableRefObject<HTMLDivElement | null>;
    scoreMark: React.MutableRefObject<HTMLSpanElement | null>;
    titleHeading: React.MutableRefObject<HTMLHeadingElement | null>;
}
