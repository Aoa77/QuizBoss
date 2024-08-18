import { rmSync } from "fs";
try {
    rmSync("public/quizzes", { recursive: true });
}   
catch (e) { 
    console.warn("*** WARNING ***\n", e);
}