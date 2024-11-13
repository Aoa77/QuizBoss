import { AppContext } from "../app/context";
import { ButtonState, EventName } from "../code/game";
import { QuizData } from "../code/QuizData";
import { QuizItem } from "../code/QuizItem";
import { QuizModule } from "../code/QuizModule";
import { LocalStore } from "../libs/friendlies/LocalStore";
import { generateRandomString } from "../libs/randos/generateRandomString";
import { shuffle } from "../libs/randos/shuffle";

const count = {
    imagesLoaded: 0,
};

export async function LoadQuizModule() {
    const { settings, flow } = AppContext.current(EventName.LoadQuizModule);
    const { maxQuestions, guessButtonCount } = settings;
    count.imagesLoaded = 0;

    const bestScore = LocalStore.numbers.get("bestScore", 0)!;
    console.info("Best score restored: ", bestScore);

    const quizModule = await fetchQuizModule(settings.quizModuleName);
    console.info(`Quiz module loading: ${quizModule.name}`, quizModule);
    const { quizData } = quizModule;
    const { items } = quizData;

    shuffle(items);
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        initQuizItem(item, index, quizModule.name);
    }

    randomizeGuessPool(guessButtonCount, quizData);
    if (maxQuestions > 0) {
        quizData.items = quizData.items.slice(0, maxQuestions);
    }
    const totalItems = quizData.items.length;

    // await loadImages(quizData);
    flow.dispatch((state) => ({
        ...state,
        totalItems,
        quizModule,
        eventName: EventName.StartQuiz,
    }));
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

function randomizeGuessPool(
    guessButtonCount: number,
    quizData: QuizData,
): void {
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
            buttonStyle: ButtonState.normal,
        };
        quizData.randomizedGuessPool.push(dummyItem);
    }
    shuffle(quizData.randomizedGuessPool);
}

// async function loadImages(quizData: QuizData): Promise<void> {
//     ///
//     console.info("Loading quiz images...");

//     ///
//     for (const item of quizData.items) {
//         await fetchImage(item);
//         const progress = Math.round(
//             (++count.imagesLoaded / quizData.items.length) * 100,
//         );
//         ThemeVars.setValue(TV.LoadingProgress_BAR_width, `${progress}%`);
//     }
// }

// async function fetchImage(item: QuizItem): Promise<void> {
//     const img = new Image(3);
//     img.id = `preload-image-${item.index}`;
//     img.src = item.imageSrc;
//     document.getElementById("preload")!.appendChild(img);
// }
