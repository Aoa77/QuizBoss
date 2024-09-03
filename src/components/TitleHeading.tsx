import { AppProps } from "../props";

export default function TitleHeading(props: AppProps) {
    const { elements, state } = props;
    const quizData = state.quizModule?.quizData;
    return (
        <h1 ref={elements.titleHeading} className="hidden">
            {quizData?.title ?? <>&nbsp;</>}
        </h1>
    );
}
