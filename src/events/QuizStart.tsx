import { AppSettings } from "../app/AppSettings";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QuizTitle } from "../components/QuizTitle";
import { Task } from "../libs/csharp-sim/Task";
import { $LocalStorageCache } from "../libs/flow-context/$LocalStorageCache";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { generateRandomString } from "../libs/random-funcs/generateRandomString";
import { shuffle } from "../libs/random-funcs/shuffle";
import { EventName } from "../models/EventName";
import { QuizItem } from "../models/QuizItem";
import { QuizModule } from "../models/QuizModule";
import { QuizState } from "../models/QuizState";

const config = {
    FIRST_QUESTION_DELAY: 1000,
}

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

        state.best = $LocalStorageCache.numbers.get("best", 0);
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
    loadImages(module);
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
    item.image = new Image();
    item.image.onload = () => {
        item.imageJsx = <img src={item.image.src} alt="" />;
        item.isLoaded = true;
    };
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
            image: new Image(),
            imageJsx: <img src="" alt="" />,
            imageSrc: "",
            isLoaded: true,
            answeredCorrectly: false,
        };
        module.quizData.randomizedGuessPool.push(dummyItem);
    }
    shuffle(module.quizData.randomizedGuessPool);
}

async function loadImages(module: QuizModule) {
    console.info("Loading quiz images...");
    const THROTTLE = 2;
    for (const item of module.quizData.items) {
        item.image.src = item.imageSrc;
        console.debug(item.imageSrc);
        await Task.delay(THROTTLE);
    }
}
