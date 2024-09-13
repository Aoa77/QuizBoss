import { cpSync, mkdirSync, readdirSync, rmSync } from "fs";

console.log("<update-quiz-modules>\n***");
updateQuizModules(true, "local_modules");
updateQuizModules(false, "node_modules");
console.log("***\n</update-quiz-modules>\n\n");

export default function updateQuizModules(clean, src) {
    const PUBLIC = "public/quizzes";
    if (clean) {
        console.info(`Cleaning ${PUBLIC}..`);
        try {
            rmSync(PUBLIC, { recursive: true });
        } catch (e) {
            console.warn("*** WARNING ***", e);
        }
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
    console.info(`Searching for quiz modules in ${src}`);
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
    console.info(`Found total quiz modules: ${mods.length}`);
    return mods;
}
