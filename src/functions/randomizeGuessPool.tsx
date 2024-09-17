import QuizItem from "../state/QuizItem";
import QuizModule from "../state/QuizModule";

export default function randomizeGuessPool(module: QuizModule) {
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
