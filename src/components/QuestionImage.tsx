import { Duration } from "../libs/anime+/Constants";
import { FlowContext } from "../libs/flow-context/FlowContext";
import { TaskGroup } from "../libs/friendlies/Task";
import { EventName } from "../models/EventName";
import { currentQuizItem, QuizState } from "../models/QuizState";
import { LoadingSpinner } from "./LoadingSpinner";
import { createAnimation } from "./QuestionImage.animation";
import { createConfig } from "./QuestionImage.config";

/////////////////////////////////////////////
const config = createConfig();
const animation = createAnimation(config);
/////////////////////////////////////////////

export function QuestionImage() {
    const [state] = FlowContext.current<QuizState>();
    let jsx: JSX.Element | null = null;

    const item = currentQuizItem(state);
    if (item !== null) {
        jsx = (
            <img
                src={item.imageSrc}
                style={config.imgStyle}
                alt=""
                onPointerDown={onPointerDown}
            />
        );
    }

    return (
        <section id={config.id} ref={config.ref} style={config.sectionStyle}>
            {jsx}
        </section>
    );
}

async function onPointerDown() {
    if (!config.enableSecretNextImage) {
        return;
    }

    const [state, setState] = FlowContext.current<QuizState>();

    const anims = TaskGroup.create();
    const duration = Duration.oneSecond;
    anims.add(QuestionImage.animation.out({ duration }));
    anims.add(
        LoadingSpinner.animation.in({ delay: 0.45 * duration, duration }),
    );
    await anims.all();


    setState({ ...state, eventName: EventName.PrepQuestion });
}

/////////////////////////////////////////////
QuestionImage.config = config;
QuestionImage.animation = animation;
/////////////////////////////////////////////
