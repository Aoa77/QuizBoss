import React from "react";

export interface AppProps {
    quizTitle: string
}

export function App(props: AppProps) {
    return (
        <main>
            <h1>{props.quizTitle}</h1>
            <div className="spinner"></div>
            
        </main>
    );
}

