import ElementRef from "./ElementRef";

export default interface ElementRefs {
    appVersion: ElementRef<HTMLHeadingElement | null>;
    bestValue: ElementRef<HTMLDivElement | null>;
    buttonArea: ElementRef<HTMLDivElement | null>;
    image: ElementRef<HTMLDivElement | null>;
    loading: ElementRef<HTMLDivElement | null>;
    progress: ElementRef<HTMLDivElement | null>;
    question: ElementRef<HTMLHeadingElement | null>;
    scoreValue: ElementRef<HTMLDivElement | null>;
    scoreArea: ElementRef<HTMLDivElement | null>;
    settingsPanel: ElementRef<HTMLDivElement | null>;
    sliderGrip: ElementRef<HTMLDivElement | null>;
    sliderNotch: ElementRef<HTMLDivElement | null>;
    title: ElementRef<HTMLHeadingElement | null>;
}
