import { Config } from "../app";
import {
    ElementController,
    StateController,
    TimeController,
} from "../controllers";
import { useRef } from "react";

export default function useElementController(
    config: Config,
    stateController: StateController,
    timeController: TimeController,
): ElementController {
    return new ElementController(
        config,
        {
            appVersion: useRef<HTMLHeadingElement | null>(null),
            buttonsSection: useRef<HTMLDivElement | null>(null),
            imageSection: useRef<HTMLDivElement | null>(null),
            loadingSection: useRef<HTMLDivElement | null>(null),
            progressSection: useRef<HTMLDivElement | null>(null),
            questionHeading: useRef<HTMLHeadingElement | null>(null),
            scoreSection: useRef<HTMLDivElement | null>(null),
            scoreMark: useRef<HTMLSpanElement | null>(null),
            titleHeading: useRef<HTMLHeadingElement | null>(null),
        },
        stateController,
        timeController,
    );
}
