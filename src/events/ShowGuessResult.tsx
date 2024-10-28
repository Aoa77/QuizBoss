import { GuessButtons } from "../components/GuessButtons";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { QuizState } from "../models/QuizState";

export async function ShowGuessResult() {
    const [state, setState] = FlowContext.current<QuizState>();
    const animation = GuessButtons.animations[state.guessButtonIndex];

    const anims = TaskGroup.create();
    anims.add(animation.buttonPress());
    await anims.all();

    setState({ ...state, eventName: EventName.AwaitGuess });
}
