import { AppSettings } from "../app/AppSettings";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuizTitle } from "../components/QuizTitle";
import { Task } from "../libs/csharp-sim/Task";
import { LocalStore } from "../libs/flow-context/LocalStore";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { generateRandomString } from "../libs/random-funcs/generateRandomString";
import { shuffle } from "../libs/random-funcs/shuffle";
import { EventName } from "../models/EventName";
import { QuizItem } from "../models/QuizItem";
import { QuizModule } from "../models/QuizModule";
import { QuizState } from "../models/QuizState";
import { QuestionImage } from "../components/QuestionImage";

const config = {
    FIRST_QUESTION_DELAY: 1000,
};

export async function QuizStart() {
    const [state, setState] = FlowContext.current<QuizState>();
    const loadingSpinner = LoadingSpinner.animation;
    const quizTitle = QuizTitle.animation;

    if (state.quizModule === null) {
        if (state.eventWait > 0) {
            throw new Error("quizModel init has failed.");
        }

        await loadingSpinner.fadeIn.start();
        loadingSpinner.loop.play();

        state.best = LocalStore.numbers.get("best", 0);
        await initQuizModule(state);
        setState({ ...state, eventWait: ++state.eventWait });
        return;
    }

    await quizTitle.fadeIn.start();
    await Task.delay(config.FIRST_QUESTION_DELAY);
    setState({ ...state, eventName: EventName.NextQuestion });
}

async function initQuizModule(state: QuizState): Promise<void> {
    const { settings } = state;
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
    const questionImage = QuestionImage.animation;

    ///
    for (const item of module.quizData.items) {
        const [width, height] = await fetchImageSize(item.imageSrc);
        item.imageWidth = width;
        item.imageHeight = height;
        if (questionImage.minHeight < 1 || questionImage.minHeight > height) {
            questionImage.minHeight = height;
        }
    }
}
async function fetchImageSize(src: string): Promise<[number, number]> {
    const response = await fetch(src);
    if (!response.ok) {
        throw new Error(`Failed to load image: ${src}`);
    }
    const blob = await response.blob();
    const img = new Image();
    const load = new Promise<[number,number]>((resolve) => {
        img.onload = () => {
            const size: [number, number] = [img.width, img.height];
            console.debug(`Image ${src} loaded:`, size);
            resolve(size);
        };
    });
    img.src = URL.createObjectURL(blob);
    return await load;
}
