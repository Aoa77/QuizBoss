import { AppSettings } from "../app/App.settings";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { LocalStore } from "../libs/friendlies/LocalStore";
import { generateRandomString } from "../libs/randos/generateRandomString";
import { shuffle } from "../libs/randos/shuffle";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { EventName } from "../models/EventName";
import { QuizItem } from "../models/QuizItem";
import { QuizModule } from "../models/QuizModule";
import { QuizState } from "../models/QuizState";
import { TV } from "../models/Theme";

const count = {
    imagesLoaded: 0,
};

export async function LoadQuizModule(): Promise<void> {
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    count.imagesLoaded = 0;

    state.bestScore = LocalStore.numbers.get("bestScore", 0)!;
    console.info("Best score restored: ", state.bestScore);

    const module = await fetchQuizModule(settings.quizModuleName);
    console.info(`Quiz module loading: ${module.name}`, module);

    shuffle(module.quizData.items);
    for (let index = 0; index < module.quizData.items.length; index++) {
        const item = module.quizData.items[index];
        initQuizItem(item, index, module);
    }

    randomizeGuessPool(module, settings);
    if (settings.maxQuestions > 0) {
        module.quizData.items = module.quizData.items.slice(
            0,
            settings.maxQuestions,
        );
    }

    state.quizModule = module;
    state.totalItems = module.quizData.items.length;
    await loadImages(module);
    setState({ ...state, eventName: EventName.QuizStart });
}

async function fetchQuizModule(quizModuleName: string): Promise<QuizModule> {
    const response = await fetch(`${quizModuleName}/package.json`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch quiz module: ${quizModuleName}`);
    }
    const module: QuizModule = await response.json();
    return module;
}

function initQuizItem(item: QuizItem, indez: number, module: QuizModule) {
    item.index = indez;
    item.isDummy = false;
    item.duplicateItemKeys ??= [];
    item.imageSrc = `${module.name}/${item.imageSrc}`;
}

function randomizeGuessPool(module: QuizModule, settings: AppSettings): void {
    const { guessButtonCount } = settings;
    module.quizData.randomizedGuessPool = module.quizData.items.slice();

    // need at least number of dummy items as number of guess buttons
    // to avoid duplicates answer choices.
    while (module.quizData.dummies.length < guessButtonCount) {
        while (true) {
            const dummyGen = generateRandomString().split("");
            if (dummyGen.length === 0) {
                throw new Error("dummyGen.length === 0");
            }
            let dummy: string = dummyGen.pop()!;
            while (dummyGen.length > 0) {
                dummy += dummyGen.pop()!.toLowerCase();
            }

            if (!module.quizData.dummies.includes(dummy)) {
                module.quizData.dummies.push(dummy);
                break;
            }
        }
    }

    for (const dummy of module.quizData.dummies) {
        const dummyItem: QuizItem = {
            index: -1,
            isDummy: true,
            key: dummy,
            duplicateItemKeys: [],
            name: dummy,
            imageSrc: "",
            imageWidth: 0,
            imageHeight: 0,
            answeredCorrectly: false,
        };
        module.quizData.randomizedGuessPool.push(dummyItem);
    }
    shuffle(module.quizData.randomizedGuessPool);
}

async function loadImages(module: QuizModule) {
    ///
    console.info("Loading quiz images...");

    ///
    for (const item of module.quizData.items) {
        await fetchImage(item);
        ThemeVars.setValue(
            TV.LoadingProgress_BAR_width,
            `${(++count.imagesLoaded / module.quizData.items.length) * 100}%`,
        );
    }
}

async function fetchImage(item: QuizItem): Promise<void> {
    const response = await fetch(item.imageSrc);
    if (!response.ok) {
        throw new Error(`Failed to load image: ${item.imageSrc}`);
    }

    const blob = await response.blob();
    const img = new Image();
    const load = new Promise<[number, number]>((resolve) => {
        img.onload = () => {
            const size: [number, number] = [img.width, img.height];
            console.debug(`Image ${item.imageSrc} loaded:`, size);
            resolve(size);
        };
    });

    img.src = URL.createObjectURL(blob);
    const [width, height] = await load;
    item.imageWidth = width;
    item.imageHeight = height;
}
