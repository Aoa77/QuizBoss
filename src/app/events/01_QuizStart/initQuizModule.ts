import { shuffle } from "../../../core/util/shuffle";
import { QuizState } from "../../models/QuizState";
import { randomizeGuessPool } from "./randomizeGuessPool";
import { truncateQuizItems } from "./truncateQuizItems";
import { initQuizItem } from "./initQuizItem";
import { fetchQuizModule } from "./fetchQuizModule";
import { wait } from "../../../core/animation/wait";
import { LOADING } from "../../constants/LOADING";
import { QuizModule } from "../../models/QuizModule";

export async function initQuizModule(state: QuizState): Promise<void> {
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
        truncateQuizItems(settings, module);
    }

    state.quizModule = module;
    state.totalItems = module.quizData.items.length;
    loadImages(module);
}




async function loadImages(module: QuizModule) {
    console.info("Loading quiz images...");
    for (const item of module.quizData.items) {
        item.image.src = item.imageSrc;
        await wait(LOADING.THROTTLE);
    }
}
