import { useEffect } from "react";
import { delay, shuffle } from "./Util";


export interface QuizModule {
    name: string;
    version: string;
    quizdata: QuizData;
}

export interface QuizData {
    title: string;
    description: string;
    question: string;
    items: QuizItem[];
}

export interface QuizItem {
    name: string;
    image: HTMLImageElement;
    imageJsx: JSX.Element;
    imageSrc: string;
    isLoaded: boolean;
    answeredCorrectly: boolean;
}

export function useQuizModule(
    imageLoadThrottle: number,
    moduleName: string,
    setModule: (module: QuizModule) => void,
): void {
    useEffect(() => {
        fetchQuizModule(moduleName).then((module) => {
            console.info(`Quiz module loaded: ${module.name}`);
            module.quizdata.items.forEach((item) => {
                item.imageSrc = `quizzes/${module.name}/${item.imageSrc}`;
                console.debug(`Image source: ${item.imageSrc}`);
                item.image = new Image();
                item.image.onload = () => {
                    console.debug(`Image loaded: ${item.image.src}`);
                    item.imageJsx = <img src={item.image.src} alt="" />;
                    item.isLoaded = true;
                };
            });
            shuffle(module.quizdata.items);
            setModule(module);
            loadQuizImages(imageLoadThrottle, module.quizdata.items);
        });
    }, [imageLoadThrottle, moduleName, setModule]);
}

async function fetchQuizModule(moduleName: string): Promise<QuizModule> {
    const response = await fetch(`quizzes/${moduleName}/package.json`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch quiz module: ${moduleName}`);
    }
    const module:QuizModule = await response.json();
    return module;
}

async function loadQuizImages(
    imageLoadThrottle: number,
    quizItems: QuizItem[],
): Promise<void> {
    for (const item of quizItems) {
        item.image.src = item.imageSrc;
        await delay(imageLoadThrottle);
    }
}
