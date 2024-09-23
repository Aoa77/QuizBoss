import { XrefCollection } from "./xref";

export const collections = {
    buttons: new XrefCollection<HTMLButtonElement>(),
    divs: new XrefCollection<HTMLDivElement>(),
    headings: new XrefCollection<HTMLHeadingElement>(),
};
