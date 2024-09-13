import updateQuizModules from "./updateQuizModules.js";

console.info("Running pre-build script...");
updateQuizModules("local_modules");
updateQuizModules("node_modules");
 

