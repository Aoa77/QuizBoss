import bindGuessButtons from "../functions/bindGuessButtons";
import randomInt from "../../core/random/randomInt";
import { GameState } from "../models/GameState";
import { getAppStateFlow } from "../appFlow/useAppStateFlow";
import { getXrefHeadings } from "../../core/xrefs/headings";
import { ElementNames } from "../elements/constants";
import { getXrefDivs } from "../../core/xrefs/divs";
import { getXrefButtons } from "../../core/xrefs/buttons";
import { fadeIn, fadeOut } from "../elements/fade";

///
export default async function onNext() {
    const [state, setState] = getAppStateFlow();
    if (!state.quizModule) {
        return;
    }

    const [appVersion, question] = getXrefHeadings(
        ElementNames.appVersion,
        ElementNames.question,
    );
    const [buttonArea, image, loading, progress, scoreArea] = getXrefDivs(
        ElementNames.buttonArea,
        ElementNames.image,
        ElementNames.loading,
        ElementNames.progress,
        ElementNames.scoreArea,
    );

    const currentGuessPool: string[] = [];
    const quizData = state.quizModule.quizData;
    const quizItems = quizData.items;
    const currentItem = quizItems[state.currentItemIndex];

    //elements.clearScoreBonusStyle();
    state.answerSpot = randomInt(0, state.settings.guessButtonCount);
    console.info("answerSpot: ", state.answerSpot);

    const buttons = getXrefButtons();
    await bindGuessButtons(
        state.answerSpot,
        currentGuessPool,
        currentItem,
        buttons,
        quizData,
    );

    await fadeOut({ xref: loading! });
    await fadeIn({ xref: image! });
    await fadeIn({ xref: appVersion! });
    await fadeIn({ xref: question! });
    await fadeIn({ xref: buttonArea! });
    await fadeIn({ xref: scoreArea! });
    await fadeIn({ xref: progress! });
    await fadeIn({ xref: appVersion! });

    for (const button of buttons) {
        await fadeIn({ xref: button! });
    }

    setState({ ...state, gameState: GameState.INPUT });
}
