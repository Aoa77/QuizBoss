import AppProps from "../props/AppProps";

export default function TitleHeading(props: AppProps) {
    const { elements, quizModule } = props;
    const quizData = quizModule?.quizData;
    return (
        <h1 ref={elements.titleHeading} className="hidden">
            {quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
