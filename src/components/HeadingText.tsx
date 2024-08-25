import { Context } from "./Context";

export default function HeadingText(context: Context) {
    const { elements, quizModule } = context;
    const quizData = quizModule?.quizData;
    return (
        <>
            <h1 ref={elements.title} className="hidden">
                {quizData?.title}
            </h1>
            <h2 ref={elements.question} className="hidden">
                {quizData?.questionText}
            </h2>
        </>
    );
}
