import { GuessButtons } from "../components/GuessButtons";
import { Duration } from "../libs/anime+/Constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function ShowGuessResult() {
    const [state, setState] = FlowContext.current<QuizState>();

    const duration = Duration.oneSecond;
    const anims = TaskGroup.create();
    anims.add(
        GuessButtons.animations[state.guessButtonIndex].validGuess({
            delay: 0,
            duration,
            enable: true,
        }),
    );
    await anims.all();

    setState({ ...state, eventName: EventName.AwaitGuess });
}
