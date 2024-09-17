import AppContext from "../app/AppContext";

export default function QuestionImage() {
    const elements = AppContext.elements();
    const { refs } = elements;
    const { image } = refs;
    
    const appState = AppContext.appState();
    const { state } = appState;
    const { currentItemIndex, quizModule } = state;
    const quizData = quizModule?.quizData;
    
    return (
        <section id={image.target} ref={image.object} className="image hidden">
            {quizData?.items[currentItemIndex].imageJsx}
        </section>
    );
}
