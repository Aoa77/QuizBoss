export function showErrorUI(error: unknown) {
    const style = document.createElement("style");
    style.textContent = `
        body {
            background-color: #000033ff;
            color: #ffff00ff;
            font-family: monospace;
            margin: 4rem;
        }
        div.error-display {
            background-color: #000000ff;
            border-color: #ff0000ff;
            border-style: solid;
            border-width: 1rem;
            padding: 4rem;
            overflow: scroll;
            scroll: auto;
        }
        h2 { 
            font-size: 4rem; 
            border-bottom: 1px solid yellow;
        }
        h2.info {
            margin-top: 4rem;
        }
        p  { 
            font-size: 2rem; 
            margin-top: 2rem; 
        }
    `;
    document.head.appendChild(style);

    let message: string = "An unknown error occurred.";
    let infoLabel: string = "INFO";
    let info: string = "";

    if (error instanceof Error) {
        message = error.message;
        infoLabel = "STACK TRACE";
        info = error.stack ?? "";
    } else {
        info = error?.toString() ?? "";
    }

    const div = document.createElement("div");
    div.className = "error-display";

    const h2_message = document.createElement("h2");
    h2_message.className = "message";
    h2_message.textContent = "ERROR";
    div.appendChild(h2_message);

    const p_message = document.createElement("p");
    p_message.className = "message";
    p_message.textContent = message;
    div.appendChild(p_message);

    const h2_info = document.createElement("h2");
    h2_info.className = "info";
    h2_info.textContent = infoLabel;
    div.appendChild(h2_info);

    const p_info = document.createElement("p");
    p_info.className = "info";
    p_info.textContent = info;
    div.appendChild(p_info);

    const root: HTMLElement | null = document.getElementById("root");
    if (root) {
        root.remove();
    }
    document.body.appendChild(div);
    throw error;
}
