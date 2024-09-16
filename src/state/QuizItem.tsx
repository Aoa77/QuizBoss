export default interface QuizItem {
    index: number;
    isDummy: boolean;
    key: string;
    duplicateItemKeys: string[];
    name: string;
    image: HTMLImageElement;
    imageJsx: JSX.Element;
    imageSrc: string;
    isLoaded: boolean;
    answeredCorrectly: boolean;
}
