import { QuizModule } from "../../../../src/models/QuizModule";

export async function loadImages(module: QuizModule) {
    console.info("Loading quiz images...", module);
    // for (const item of module.quizData.items) {
    //     // item.image.src = item.imageSrc;
    //     await wait(TIME.LOADING_THROTTLE);
    // }
}
