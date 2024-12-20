import { FlowContext } from "../libs/flow-context/FlowContext";
import { LocalStore } from "../libs/friendlies/LocalStore";
import { generateRandomString } from "../libs/randos/generateRandomString";
import { shuffle } from "../libs/randos/shuffle";
import { ThemeVars } from "../libs/theme-vars/ThemeVars";
import { ButtonStyle } from "../models/ButtonStyle";
import { EventName } from "../models/EventName";
import { QuizItem } from "../models/QuizItem";
import { QuizModule } from "../models/QuizModule";
import { QuizState } from "../models/QuizState";
import { TV } from "../models/Theme";

const count = {
    imagesLoaded: 0,
};

export async function handleLoadQuizModule() {
    const [state, setState] = FlowContext.current<QuizState>();
    const { settings } = state;
    count.imagesLoaded = 0;

    state.bestScore = LocalStore.numbers.get("bestScore", 0)!;
    console.info("Best score restored: ", state.bestScore);

    state.quizModule = await fetchQuizModule(settings.quizModuleName);
    console.info(`Quiz module loading: ${state.quizModule!.name}`, state.quizModule!);
    const { quizModule } = state;
    const { quizData } = quizModule;

    shuffle(quizData.items);
    for (let index = 0; index < quizData.items.length; index++) {
        const item = quizData.items[index];
        initQuizItem(item, index, quizModule.name);
    }

    randomizeGuessPool(state);
    if (settings.maxQuestions > 0) {
        quizData.items = quizData.items.slice(0, settings.maxQuestions);
    }
    state.totalItems = quizData.items.length;

    await loadImages(state);
    setState({ ...state, eventName: EventName.StartQuiz });
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

function initQuizItem(item: QuizItem, index: number, moduleName: string) {
    item.index = index;
    item.isDummy = false;
    item.duplicateItemKeys ??= [];
    item.imageSrc = `${moduleName}/${item.imageSrc}`;
}

function randomizeGuessPool(state: QuizState): void {
    const { settings, quizModule } = state;
    const { quizData } = quizModule!;
    const { guessButtonCount } = settings;
    quizData.randomizedGuessPool = quizData.items.slice();

    // need at least number of dummy items as number of guess buttons
    // to avoid duplicates answer choices.
    while (quizData.dummies.length < guessButtonCount) {
        while (true) {
            const dummyGen = generateRandomString().split("");
            if (dummyGen.length === 0) {
                throw new Error("dummyGen.length === 0");
            }
            let dummy: string = dummyGen.pop()!;
            while (dummyGen.length > 0) {
                dummy += dummyGen.pop()!.toLowerCase();
            }

            if (!quizData.dummies.includes(dummy)) {
                quizData.dummies.push(dummy);
                break;
            }
        }
    }

    for (const dummy of quizData.dummies) {
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
            buttonStyle: ButtonStyle.normal,
        };
        quizData.randomizedGuessPool.push(dummyItem);
    }
    shuffle(quizData.randomizedGuessPool);
}

async function loadImages(state: QuizState) {
    ///
    console.info("Loading quiz images...");
    const { settings, quizModule } = state;
    const { quizData } = quizModule!;
    const { preloadImageCount } = settings;
    const preloadCount =
        preloadImageCount > 0 //
            ? preloadImageCount
            : quizData.items.length;

    ///
    for (const item of quizData.items) {
        if (count.imagesLoaded < preloadCount) {
            await fetchImage(item);
            ThemeVars.setValue(
                TV.LoadingProgress_BAR_width,
                `${(++count.imagesLoaded / preloadCount) * 100}%`,
            );
            continue;
        }
        fetchImage(item);
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
