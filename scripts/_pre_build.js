import updateAppVersion from "./updateAppVersion.js";
import updateQuizModules from "./updateQuizModules.js";

console.log("\n<pre-build-scripts>");

updateQuizModules("local_modules");
updateQuizModules("node_modules");
await updateAppVersion();

console.log("\n</pre-build-scripts>\n");