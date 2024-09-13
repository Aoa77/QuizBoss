import fs from "fs";
import readline from "readline";

const FILE_PATH = "src/components/AppVersion.tsx";

////
export default function updateAppVersion() {
    const reader = readline.createInterface({
        input: fs.createReadStream(FILE_PATH),
        output: process.stdout,
        terminal: false,
    });

    const updatedLines = [];

    reader.on("line", (line) => {
        console.log(line);
        updatedLines.push(line);
    });

    reader.on("close", () => {
        fs.writeFileSync(FILE_PATH, updatedLines.join("\n"));
        console.log("Job's done!");
    });
}
