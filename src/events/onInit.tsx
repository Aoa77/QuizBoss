import AppContext from "../app/AppContext";
import shuffle from "../random/shuffle";
import { GameState } from "../state/GameState";
import QuizItem from "../state/QuizItem";
import QuizModule from "../state/QuizModule";
import delay from "../time/delay";
import { Duration } from "../time/Duration";
import { Multiplier } from "../time/Multiplier";

///
export async function onInit(context: AppContext) {
    const { config, elements, states } = context;
    const { refs } = elements;
    const { loading } = refs;
    const { state, setState } = states;
    const { quizModuleName } = config;

    await elements.fadeIn(loading.target);
    await initQuizModule();
    await delay(Duration.WAIT, Multiplier.x3);

    setState({ ...state, gameState: GameState.READY });
    return;

    async function initQuizModule(): Promise<void> {
        //
        const module = await fetchQuizModule();
        console.info(`Quiz module loading: ${module.name}`, module);

        shuffle(module.quizData.items);
        for (let i = 0; i < module.quizData.items.length; i++) {
            const item = module.quizData.items[i];
            initItem(item, i, module);
        }

        randomizeGuessPool(module);
        shuffle(module.quizData.randomizedGuessPool);

        if (config.maxQuestions > 0) {
            truncateItems(module);
        }

        state.quizModule = module;
        loadQuizImages(module.quizData.items);
    }

    function truncateItems(module: QuizModule): void {
        module.quizData.items = module.quizData.items.slice(
            0,
            config.maxQuestions,
        );
    }

    function initItem(item: QuizItem, i: number, module: QuizModule) {
        item.index = i;
        item.isDummy = false;
        item.duplicateItemKeys ??= [];

        item.imageSrc = `${module.name}/${item.imageSrc}`;
        console.debug(`Image source: ${item.imageSrc}`);
        item.image = new Image();
        item.image.onload = () => {
            console.debug(`Image loaded: ${item.image.src}`);
            item.imageJsx = <img src={item.image.src} alt="" />;
            item.isLoaded = true;
        };
    }

    function randomizeGuessPool(module: QuizModule) {
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
    }

    async function fetchQuizModule(): Promise<QuizModule> {
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

    async function loadQuizImages(quizItems: QuizItem[]): Promise<void> {
        console.info("Loading quiz images...");
        for (const item of quizItems) {
            item.image.src = item.imageSrc;
            await delay(Duration.THROTTLE);
        }
    }
}
