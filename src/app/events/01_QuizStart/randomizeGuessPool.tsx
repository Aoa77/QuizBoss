import { generateRandomString } from "../../../core/util/generateRandomString";
import { shuffle } from "../../../core/util/shuffle";
import { AppSettings } from "../../models/AppSettings";
import { QuizItem } from "../../models/QuizItem";
import { QuizModule } from "../../models/QuizModule";


export function randomizeGuessPool(module: QuizModule, settings: AppSettings): void {
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
