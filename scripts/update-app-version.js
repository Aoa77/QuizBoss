import fs from "fs";
import readline from "readline";

console.log("<update-app-version>\n***");
await updateAppVersion();
console.log("***\n</update-app-version>\n\n");

export default async function updateAppVersion() {
    const FILE_PATH = "src/components/AppVersion.tsx";
    return new Promise((resolve, reject) => {
        console.log(`Updating file: "${FILE_PATH}"`);

        const reader = readline.createInterface({
            input: fs.createReadStream(FILE_PATH),
            output: process.stdout,
            terminal: false,
        });

        const updatedLines = [];

        reader.on("line", (line) => {
            if (line.indexOf("const VERSION") === 0) {
                updatedLines.push(
                    `const VERSION = "${new Date().toISOString()}";`,
                );
                return;
            }
            updatedLines.push(line);
        });

        reader.on("close", () => {
            fs.writeFileSync(FILE_PATH, updatedLines.join(""));
            resolve();
        });
    });
}
