import { shuffle } from "../../../../src/libs/random-funcs/shuffle";
import { QuizState } from "../../../../src/models/QuizState";
import { randomizeGuessPool } from "./randomizeGuessPool";
import { truncateQuizItems } from "./truncateQuizItems";
import { initQuizItem } from "./initQuizItem";
import { fetchQuizModule } from "./fetchQuizModule";
import { loadImages } from "./$loadImages";

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


