import AppProps from "../props/AppProps";

export default function GuessButtons(props: AppProps) {
    const { elements, guessButtons } = props;
    return (
        <section ref={elements.buttonsSection} className="buttons hidden">
            {guessButtons.map((b) => b.element)}
        </section>
    );
}