import { useRef } from "react";
import { AppConfig } from "../app";
import {
    ElementController,
    StateController,
    TimeController,
} from "../controllers";

export default function useElementController(
    config: AppConfig,
    states: StateController,
    time: TimeController,
): ElementController {
    return new ElementController(
        config,
        {
            appVersion: {
                target: ".appVersion",
                fadeIn: 250,
                fadeOut: 250,
                sustain: 1000,
            },
            best: { target: ".best", fadeIn: 250, fadeOut: 250, sustain: 1000 },
            buttons: {
                target: ".buttons",
                fadeIn: 250,
                fadeOut: 250,
                sustain: 1000,
            },
            image: {
                target: ".image",
                fadeIn: 250,
                fadeOut: 250,
                sustain: 1000,
            },
            loading: {
                target: ".loading",
                fadeIn: 250,
                fadeOut: 250,
                sustain: 1000,
            },
            progress: {
                target: ".progress",
                fadeIn: 250,
                fadeOut: 250,
                sustain: 1000,
            },
            question: {
                target: ".questionHeading",
                fadeIn: 250,
                fadeOut: 250,
                sustain: 1000,
            },
            score: {
                target: ".score",
                fadeIn: 250,
                fadeOut: 250,
                sustain: 1000,
            },
            scoreArea: {
                target: ".scoreArea",
                fadeIn: 250,
                fadeOut: 250,
                sustain: 1000,
            },
            title: {
                target: "h1",
                fadeIn: 250,
                fadeOut: 250,
                sustain: 1000,
            },
        },
        {
            appVersion: useRef<HTMLHeadingElement | null>(null),
            best: useRef<HTMLDivElement | null>(null),
            buttons: useRef<HTMLDivElement | null>(null),
            image: useRef<HTMLDivElement | null>(null),
            loading: useRef<HTMLDivElement | null>(null),
            progress: useRef<HTMLDivElement | null>(null),
            question: useRef<HTMLHeadingElement | null>(null),
            score: useRef<HTMLDivElement | null>(null),
            scoreArea: useRef<HTMLDivElement | null>(null),
            title: useRef<HTMLHeadingElement | null>(null),
        },
        states,
        time,
    );
}
