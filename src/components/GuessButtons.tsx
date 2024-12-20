import { useStyle } from "./GuessButtons.style";
import { QuizState } from "../models/QuizState";
import { AnimeComponent } from "../models/Anime";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { useAnimeRefs } from "../libs/anime-context/AnimeContext.hooks";
import { TriggerGuess } from "../events/AwaitGuess";

export function GuessButtons() {
    const style = useStyle();
    const [state] = FlowContext.current<QuizState>();
    const { buttonAnswerMap, settings } = state;
    const { guessButtonCount } = settings;
    const buttonJsx = [];

    const animations = useAnimeRefs(AnimeComponent.GuessButton, guessButtonCount);

    for (let bidx = 0; bidx < guessButtonCount; bidx++) {
        const item = buttonAnswerMap[bidx];
        if (!item) {
            continue;
        }

        const buttonText = item.name;
        const buttonStyle = {
            ...style.span, //////////
            ...style.button.get(item.buttonStyle),
        };

        const anim = animations[bidx];
        buttonJsx.push(
            <span
                id={anim.id}
                key={anim.id}
                style={buttonStyle}
                onPointerDown={() => onPointerDown(bidx)}>
                {buttonText}
            </span>,
        );
    }

    return <section style={style.section}>{buttonJsx}</section>;
}

function onPointerDown(bidx: number) {
    TriggerGuess(bidx);
}
