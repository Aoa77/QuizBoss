import { Config } from "../models";
import { useRef } from "react";
import AppStateHook  from "./AppStateHook";
import ElementsHook  from "./ElementsHook";

export  default function useElements(
    config: Config,
    stateHook: AppStateHook,
): ElementsHook {
    return new ElementsHook(config, stateHook, {
        buttonsSection: useRef<HTMLDivElement | null>(null),
        imageSection: useRef<HTMLDivElement | null>(null),
        loadingSection: useRef<HTMLDivElement | null>(null),
        progressSection: useRef<HTMLDivElement | null>(null),
        questionHeading: useRef<HTMLHeadingElement | null>(null),
        scoreSection: useRef<HTMLDivElement | null>(null),
        scoreMark: useRef<HTMLSpanElement | null>(null),
        titleHeading: useRef<HTMLHeadingElement | null>(null),
    });
}


