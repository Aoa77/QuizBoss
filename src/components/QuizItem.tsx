import { shuffle } from "./Util";

export interface QuizItem {
    code: string;
    name: string;
    image: HTMLImageElement;
    imageJsx: JSX.Element;
    isLoaded: boolean;
    answeredCorrectly: boolean;
}

export function loadQuizData(data: Record<string, string>): QuizItem[] {
    const quiz: QuizItem[] = Object.entries(data).map(([code, name]) => createQuizItem(code, name)
    );
    shuffle(quiz);
    return quiz;
}
function createQuizItem(code: string, name: string): QuizItem {
    code = code.toLowerCase();
    const imageSrc = `svg/${code}.svg`;
    const image = new Image();
    image.src = imageSrc;

    const item: QuizItem = {
        code,
        name,
        image,
        imageJsx: (
            <img
                className="current"
                src={`${imageSrc}`}
                alt="current question" />
        ),
        isLoaded: false,
        answeredCorrectly: false,
    };

    item.image.onload = () => {
        item.isLoaded = true;
    };

    return item;
}
