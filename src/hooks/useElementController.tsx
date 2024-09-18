import { useRef } from "react";
import ElementController from "../elements/ElementController";
import ElementRef from "../elements/ElementRef";

export default function useElementController(): ElementController {
    return new ElementController({
        appVersion: new ElementRef<HTMLHeadingElement>(
            "appVersion",
            useRef<HTMLHeadingElement | null>(null),
        ),
        bestValue: new ElementRef<HTMLDivElement>(
            "bestValue",
            useRef<HTMLDivElement | null>(null),
        ),
        buttonArea: new ElementRef<HTMLDivElement>(
            "buttonArea",
            useRef<HTMLDivElement | null>(null),
        ),
        image: new ElementRef<HTMLDivElement>(
            "image",
            useRef<HTMLDivElement | null>(null),
        ),
        loading: new ElementRef<HTMLDivElement>(
            "loading",
            useRef<HTMLDivElement | null>(null),
        ),
        progress: new ElementRef<HTMLDivElement>(
            "progress",
            useRef<HTMLDivElement | null>(null),
        ),
        question: new ElementRef<HTMLHeadingElement>(
            "question",
            useRef<HTMLHeadingElement | null>(null),
        ),
        scoreValue: new ElementRef<HTMLDivElement>(
            "scoreValue",
            useRef<HTMLDivElement | null>(null),
        ),
        scoreArea: new ElementRef<HTMLDivElement>(
            "scoreArea",
            useRef<HTMLDivElement | null>(null),
        ),
        settingsPanel: new ElementRef<HTMLDivElement>(
            "settingsPanel",
            useRef<HTMLDivElement | null>(null),
        ),
        sliderGrip: new ElementRef<HTMLDivElement>(
            "sliderGrip",
            useRef<HTMLDivElement | null>(null),
        ),
        sliderNotch: new ElementRef<HTMLDivElement>(
            "sliderNotch",
            useRef<HTMLDivElement | null>(null),
        ),
        title: new ElementRef<HTMLHeadingElement>(
            "title",
            useRef<HTMLHeadingElement | null>(null),
        ),
    });
}
