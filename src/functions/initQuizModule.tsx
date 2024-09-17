import AppSettings from "../app/AppSettings";
import shuffle from "../random/shuffle";
import State from "../state/State";
import fetchQuizModule from "./fetchQuizModule";
import initQuizItem from "./initQuizItem";
import loadQuizImages from "./loadQuizImages";
import randomizeGuessPool from "./randomizeGuessPool";
import truncateQuizItems from "./truncateQuizItems";

export default async function initQuizModule(
    quizModuleName: string,
    state: State,
): Promise<void> {
    //
    const settings = AppSettings.get();
    const module = await fetchQuizModule(quizModuleName);
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
    loadQuizImages(module.quizData.items);
}
