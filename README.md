# :scroll: QuizBoss

QuizBoss is a web platform for crafting and sharing quizzes and trivia games. This repository contains the source code and configuration used to build and deploy the application.

## Demos

![image](https://github.com/user-attachments/assets/876c2b8b-079a-4b17-a57a-49bdac74dfbb)



- ### Take the "World Flags Quiz"

  [https://quizboss.a77.space](https://quizboss.a77.space)

- ### Watch a sped-up, live automated demo

  [https://quizboss.a77.space?oneTickAtSpeed=350&demoMode=random](https://quizboss.a77.space?oneTickAtSpeed=350&demoMode=random)

## Developer notes

-   ### Vite, React & TypeScript

    This project was bootstrapped with [Vite](README.VITE.md) using the [React+Typescript template](README.VITE.md).

-   ### CI/CD pipeline with Azure

    The website is hosted on Azure and uses [GitHub Actions](.github/workflows/azure-static-web-apps-zealous-smoke-0c5417f10.yml) to build and deploy the application when changes are merged into the `main` branch.

-   ### UX/UI design and animation

    - UI design follows a mobile-first approach, using [pure vanilla CSS techniques](src/app/App.css) including `calc()`, viewport units, and container queries.
 
    - Dark/light color theming implemented with a custom CSS variable controller: [theme-vars](src/libs/theme-vars).  

    - User interaction is enhanced by the [Anime.js](https://github.com/juliangarnier/anime) animation engine. 



