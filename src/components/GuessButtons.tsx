import { ANIM } from "../code/animation";
import { useAppContext } from "../app/context";
import { TriggerGuess } from "../events/TriggerGuess";
import { useAnimeRefs } from "../libs/anime-context/hooks";
import { useStyle } from "./GuessButtons.style";

export function GuessButtons() {
    const { state, settings } = useAppContext();
    const { guessButtonCount } = settings;
    const { buttonAnswerMap } = state;
    const style = useStyle();
    const animations = useAnimeRefs(
        ANIM.GuessButton,
        guessButtonCount,
    );
    
    const buttonJsx = [];
    for (let bidx = 0; bidx < guessButtonCount; bidx++) {
        const item = buttonAnswerMap[bidx];
        if (!item) {
            continue;
        }

        const buttonText = item.name;
        const buttonStyle = {
            ...style?.span, //////////
            ...style?.button.get(item.buttonStyle),
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

    return <section style={style?.section}>{buttonJsx}</section>;
}

function onPointerDown(bidx: number) {
    TriggerGuess(bidx);
}
