import fs from "fs";
import readline from "readline";

console.log("\n<update-app-version>");
updateAppVersion();
console.log("\n</update-app-version>");

const FILE_PATH = "src/components/AppVersion.tsx";

////
export default async function updateAppVersion() {
    return new Promise((resolve, reject) => {
        console.log(`Updating ${FILE_PATH}...`);

        const reader = readline.createInterface({
            input: fs.createReadStream(FILE_PATH),
            output: process.stdout,
            terminal: false,
        });

        const updatedLines = [];

        reader.on("line", (line) => {
            console.log(line);
            if (line.indexOf("const VERSION") === 0) {
                updatedLines.push(
                    `const VERSION = "${new Date().toISOString()}";`,
                );
                return;
            }
            updatedLines.push(line);
        });

        reader.on("close", () => {
            console.log("");
            console.log(updatedLines.join("\n"));
            console.log("");
            fs.writeFileSync(FILE_PATH, updatedLines.join("\n"));
            console.log(`Updated ${FILE_PATH}`);
            resolve();
        });
    });
}
