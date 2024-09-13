import { cpSync, mkdirSync, rmSync } from "fs";
import { readdirSync } from "fs";
const PUBLIC = "public/quizzes";

export default function updateQuizModules(src) {
    console.info(`\nCleaning ${PUBLIC}..`);
    try {
        rmSync(PUBLIC, { recursive: true });
    } catch (e) {
        console.warn("\n*** WARNING ***\n", e);
    }

    const mods = findQuizModules(src);
    while (mods.length > 0) {
        const mod = mods.pop();
        const modsrc = `${src}/${mod}`;
        console.info(modsrc);
        const target = `${PUBLIC}/${mod}`;
        mkdirSync(target, { recursive: true });
        cpSync(modsrc, target, { recursive: true });
    }
}

function findQuizModules(src) {
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
        console.info(`\nFound quiz module: ${value}`);
        mods.push(value);
    }
    console.info(`\nFound total quiz modules: ${mods.length}`);
    return mods;
}
