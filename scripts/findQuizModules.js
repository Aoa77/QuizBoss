import minimalist from "minimist";
import { readdirSync } from "fs";
const args = minimalist(process.argv.slice(2));
const src = args["src"];
if (src) {
    findQuizModules(src);
}
export default function findQuizModules(src) {
    console.info(`\nSearching for quiz modules in ${src}`);
    const mods = [];
    const dir = readdirSync(src).entries();
    while (true) {
        const next = dir.next();
        if (!next.value) {
            break;
        }
        const value = next.value[1];
        if (!value.startsWith("quizboss-")) {
            continue;
        }
        console.info(`Found quiz module: ${value}`);
        mods.push(value);
    }
    console.info(`Found total quiz module: ${mods.length}`);
    return mods;
}
