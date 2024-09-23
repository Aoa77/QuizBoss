import { AppContext } from "../AppContext";
import { shuffle } from "../../core/random/shuffle";
import { fetchQuizModule } from "./fetchQuizModule";
import { initQuizItem } from "./initQuizItem";
import { loadQuizImages } from "./loadQuizImages";
import { randomizeGuessPool } from "./randomizeGuessPool";
import { truncateQuizItems } from "./truncateQuizItems";
import { AppState } from "../appFlow/AppState";

export async function initQuizModule(
    state: AppState,
): Promise<void> {
    //
    const module = await fetchQuizModule(state.settings.quizModuleName);
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
    loadQuizImages(module.quizData.items);
}
