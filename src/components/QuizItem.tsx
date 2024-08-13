import { delay, shuffle } from "./Util";

export interface QuizItem {
    code: string;
    name: string;
    image: HTMLImageElement;
    imageJsx: JSX.Element;
    imageSrc: string;
    isLoaded: boolean;
    answeredCorrectly: boolean;
}

export function loadQuizData(data: Record<string, string>): QuizItem[] {
    const quizItems: QuizItem[] = Object.entries(data).map(([code, name]) =>
        createQuizItem(code, name),
    );
    shuffle(quizItems);
    return quizItems;
}

export async function loadQuizImages(
    imageLoadThrottle: number,
    quizItems: QuizItem[],
): Promise<void> {
    for (const item of quizItems) {
        item.image.src = item.imageSrc;
        await delay(imageLoadThrottle);
    }
}

function createQuizItem(code: string, name: string): QuizItem {
    code = code.toLowerCase();
    const imageSrc = `svg/${code}.svg`;
    const image = new Image();

    const item: QuizItem = {
        code,
        name,
        image,
        imageJsx: (
            <img
                className="current"
                src={`${imageSrc}`}
                alt="current question"
            />
        ),
        imageSrc,
        isLoaded: false,
        answeredCorrectly: false,
    };

    item.image.onload = () => {
        console.debug(`Image loaded: ${code}`);
        item.isLoaded = true;
    };

    return item;
}
