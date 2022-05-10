import { ComponentDef, ParagraphParser } from "../markdown2json";
import { def_image } from "../../definitions";
import { mergeProps, parseCapturedProps } from "./helpers";

export const parseImageBlock: ParagraphParser = (para: string, key: string) => {
    const matches = [...para.replace(/\r?\n/g, '').matchAll(def_image.regex)];
    if (matches.length === 0 || matches[0].index !== 0) return null;
    if (matches.length === 1) return image(matches[0], key);
    return {
        name: def_image.gallery.name,
        props: { key: key, ...def_image.gallery.props },
        children: matches.map((match, i) => image(match, `${key}-${i}`))
    };
}

function image(match: RegExpMatchArray, key: string): ComponentDef {
    const cap = match.groups!;
    let props = parseCapturedProps(def_image.img.props, cap);
    if (cap.props) props = mergeProps(props, JSON.parse(cap.props));
    return {
        name: def_image.img.name,
        props: { key: key, ...props },
        children: null
    };
}

