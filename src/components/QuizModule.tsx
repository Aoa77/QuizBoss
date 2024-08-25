import { delay, shuffle } from "./Util";
import { Config } from "./Config";

export interface QuizModule {
    name: string;
    version: string;
    quizData: QuizData;
}

export interface QuizData {
    title: string;
    description: string;
    questionText: string;
    scoreText: string;
    bestText: string;
    leaderText: string;
    dummies: string[];
    items: QuizItem[];
    randomizedGuessPool: QuizItem[];
}

export interface QuizItem {
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

export async function initQuizModule(
    config: Config,
    setModule: (module: QuizModule) => void,
): Promise<void> {
    //
    const { loadThrottle, quizModuleName } = config;
    const module = await fetchQuizModule(quizModuleName);

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
    if (config.maxQuestions > 0) {
        module.quizData.items = module.quizData.items.slice(
            0,
            config.maxQuestions,
        );
    }

    for (let i = 0; i < module.quizData.items.length; i++) {
        const item = module.quizData.items[i];
        item.index = i;
        item.isDummy = false;
    }

    module.quizData.randomizedGuessPool = module.quizData.items.slice();
    for (const dummy of module.quizData.dummies) {
        const dummyItem: QuizItem = {
            index: -1,
            isDummy: true,
            key: dummy,
            duplicateItemKeys: [],
            name: dummy,
            image: new Image(),
            imageJsx: <img src="" alt="" />,
            imageSrc: "",
            isLoaded: true,
            answeredCorrectly: false,
        };
        module.quizData.randomizedGuessPool.push(dummyItem);
    }

    shuffle(module.quizData.randomizedGuessPool);
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
