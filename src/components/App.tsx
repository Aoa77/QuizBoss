import React from "react";

export interface AppProps {
    quizTitle: string;
    itemQuestion: string;
}

export function App(props: AppProps) {
    return (
        <main>
            <h1>{props.quizTitle}</h1>
            <section className="loadingArea">
                <div className="spinner"></div>
            </section>
            <section className="quizArea hidden">
                <h2>{props.itemQuestion}</h2>
            </section>
        </main>
    );
}
