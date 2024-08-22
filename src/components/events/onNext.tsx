import { Context } from "../Context";
import { GameState } from "../GameState";
import { GuessButtonState } from "../GuessButton";
import * as util from "../Util";

///
export function onNext(context: Context) {
    const {
        config,
        currentItemIndex,
        elements,
        guessButtons,
        quizModule,
        setGameState,
    } = context;

    const { guessButtonCount } = config;
    
    if (quizModule === null) {
        return;
    }
    const quizItems = quizModule.quizData.items;

    util.hideElement(elements.loading);
    util.showElement(elements.buttons);
    util.showElement(elements.image);
    util.showElement(elements.question);
    util.showElement(elements.score);
    util.showElement(elements.progress);

    const currentQuestionItemIndexChoices: number[] = [];
    const answerSpot = util.randomInt(0, guessButtonCount);
    console.info("answerSpot: ", answerSpot);

    for (let guess = 0; guess < guessButtonCount; guess++) {
        let choiceItemIndex = currentItemIndex;
        if (guess === answerSpot) {
            continue;
        }

        let isBadQuestionChoice = true;
        while (isBadQuestionChoice) {
            choiceItemIndex = util.randomInt(0, quizItems.length);
            const choiceItem = quizItems[choiceItemIndex];
            isBadQuestionChoice = [
                choiceItemIndex === currentItemIndex,
                currentQuestionItemIndexChoices.includes(choiceItemIndex),
                choiceItem.answeredCorrectly,
                choiceItem.duplicateItemKeys.includes(choiceItem.key),
            ].some((areBad) => areBad);
        }

        currentQuestionItemIndexChoices.push(choiceItemIndex);
        const ref = guessButtons[guess].ref.current!;
        ref.innerHTML = quizItems[choiceItemIndex].name;
        ref.value = quizItems[choiceItemIndex].name;
        ref.className = GuessButtonState.NORMAL;
    }
    setGameState(GameState.INPUT);
}