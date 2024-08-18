import findQuizModules from "./findQuizModules.js";
import { mkdirSync, cpSync } from "fs";
function updateQuizModules(src) {
    const mods = findQuizModules(src);
    console.info(`\nUpdating quiz modules in ${src}`);
    while (mods.length > 0) {
        const mod = mods.pop();
        const modsrc = `${src}/${mod}`;
        console.info(modsrc);
        const target = `public/quizzes/${mod}`;
        mkdirSync(target, { recursive: true });
        cpSync(modsrc, target, { recursive: true });
    }
}
updateQuizModules("local_modules");
updateQuizModules("node_modules");
