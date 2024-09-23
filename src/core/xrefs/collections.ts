import { XrefCollection } from "./classes";

export const collections = {
    buttons: new XrefCollection<HTMLButtonElement>(),
    divs: new XrefCollection<HTMLDivElement>(),
    headings: new XrefCollection<HTMLHeadingElement>(),
};
