import { QuizItem } from "../models/QuizItem";
import { QuizModule } from "../models/QuizModule";

export function initQuizItem(
    item: QuizItem,
    indez: number,
    module: QuizModule,
) {
    item.index = indez;
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
