import AppProps from "../props/AppProps";

export default function HeadingText(props: AppProps) {
    const { elements, quizModule } = props;
    const quizData = quizModule?.quizData;
    return (
        <>
            <h1 ref={elements.titleHeading} className="hidden">
                {quizData?.title ?? <>&nbsp;</>}
            </h1>
            <h2 ref={elements.questionHeading} className="hidden">
                {quizData?.questionText ?? <>&nbsp;</>}
            </h2>
        </>
    );
}
