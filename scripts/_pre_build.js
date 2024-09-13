import updateAppVersion from "./updateAppVersion.js";
import updateQuizModules from "./updateQuizModules.js";

console.info("");
console.info("Running pre-build scripts...");
console.info("");

updateQuizModules("local_modules");
updateQuizModules("node_modules");

console.info("");
console.info("bumping app version...");
updateAppVersion();

console.info("");
console.info("");