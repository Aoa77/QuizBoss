import { AppContext } from "../hooks";

export default function QuestionImage(context: AppContext) {
    const { elementsHook, stateHook } = context;
    const { state } = stateHook;
    const { currentItemIndex, quizModule } = state;
    const quizData = quizModule?.quizData;
    return (
        <section ref={elementsHook.refs.imageSection} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}
