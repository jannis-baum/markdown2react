import { ComponentDef, ParagraphParser } from "../markdown2json";
import { def_image } from "../definitions";

export const parseImageBlock: ParagraphParser = (para: string, key: string) => {
    const matches = [...para.replace(/\r?\n/g, '').matchAll(def_image.regex)]
    if (matches.length === 0 || matches[0].index !== 0) return null;
    if (matches.length === 1) return image(matches[0], key);
    return {
        name: def_image.gallery_container,
        props: { key: key, ...def_image.gallery_container_props },
        children: matches.map((match, i) => image(match, `key-${i}`))
    }
}

function image(match: RegExpMatchArray, key: string): ComponentDef {
    const cap = match.groups!
    const imgComp = {
        name: def_image.element,
        props: {
            key: key, src: cap.path, alt: cap.altText,
            ...(cap.props && !def_image.wrapper ? JSON.parse(cap.props) : {}),
            ...def_image.element_props
        },
        children: null
    }
    if (def_image.wrapper) {
        return {
            name: def_image.wrapper,
            props: {
                key: `${key}-container`,
                ...(cap.props ? JSON.parse(cap.props) : {}),
                ...def_image.wrapper_props
            },
            children: [imgComp]
        }
    } else return imgComp;
}

