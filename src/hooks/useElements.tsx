import { StateContext, ElementContext } from "../context";
import { Config } from "../models";
import { useRef } from "react";

export  default function useElements(
    config: Config,
    stateContext: StateContext,
): ElementContext {
    return new ElementContext(config, stateContext, {
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


