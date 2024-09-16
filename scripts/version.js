import fs from "fs";
import readline from "readline";

console.log("<version-update>\n***");
await updateAppVersion();
console.log("***\n</version-update>\n\n");

export default async function updateAppVersion() {
    const FILE_PATH = "src/components/AppVersion.tsx";

    let versionString = new Date().toISOString();
    versionString = versionString.replace(/-/g, "");
    versionString = versionString.replace(/:/g, "");
    versionString = versionString.replace(/T/g, ".");
    versionString = versionString.replace(/Z/g, "");

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
                const newVersion = `const VERSION = "${versionString}";`;
                updatedLines.push(newVersion);
                console.log(newVersion);
                return;
            }
            updatedLines.push(line);
        });

        reader.on("close", () => {
            fs.writeFileSync(FILE_PATH, updatedLines.join("\n"));
            resolve();
        });
    });
}
