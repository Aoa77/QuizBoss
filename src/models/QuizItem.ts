import { ButtonStyle } from "./ButtonStyle";

export interface QuizItem {
    index: number;
    isDummy: boolean;
    key: string;
    duplicateItemKeys: string[];
    name: string;
    imageSrc: string;
    imageWidth: number;
    imageHeight: number;
    answeredCorrectly: boolean;
    buttonStyle: ButtonStyle;
}

