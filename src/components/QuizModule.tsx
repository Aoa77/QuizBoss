import { delay, shuffle } from "./Util";
import { Config } from "./Config";

export interface QuizModule {
    name: string;
    version: string;
    quizData: QuizData;
}

interface QuizData {
    title: string;
    description: string;
    questionText: string;
    progressText: string;
    scoreText: string;
    items: QuizItem[];
}

export interface QuizItem {
    key: string;
    duplicateItemKeys: string[];
    name: string;
    image: HTMLImageElement;
    imageJsx: JSX.Element;
    imageSrc: string;
    isLoaded: boolean;
    answeredCorrectly: boolean;
}

export async function initQuizModule(
    config: Config,
    setModule: (module: QuizModule) => void,
): Promise<void> {
    //
    const { loadThrottle, quizModuleName } = config;
    const module = await fetchQuizModule(quizModuleName);
    if (false) {
        module.quizData.items = module.quizData.items.filter(
            (item) =>
                item.duplicateItemKeys && item.duplicateItemKeys.length > 0,
        );
    }

    console.info(`Quiz module loaded: ${module.name}`, module);
    module.quizData.items.forEach((item) => {
        item.duplicateItemKeys ??= [];
        item.imageSrc = `quizzes/${module.name}/${item.imageSrc}`;
        console.debug(`Image source: ${item.imageSrc}`);
        item.image = new Image();
        item.image.onload = () => {
            console.debug(`Image loaded: ${item.image.src}`);
            item.imageJsx = <img src={item.image.src} alt="" />;
            item.isLoaded = true;
        };
    });

    shuffle(module.quizData.items);
    setModule(module);
    loadQuizImages(loadThrottle, module.quizData.items);
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
    const module: QuizModule = await response.json();
    return module;
}

async function loadQuizImages(
    loadThrottle: number,
    quizItems: QuizItem[],
): Promise<void> {
    for (const item of quizItems) {
        item.image.src = item.imageSrc;
        await delay(loadThrottle);
    }
}
