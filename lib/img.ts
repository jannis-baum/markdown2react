import { ComponentDef, ParagraphParser } from "../markdown2json";
import { def_image } from "../definitions";

export const parseImageBlock: ParagraphParser = (para: string, key: string) => {
    const matches = [...para.replace(/\r?\n/g, '').matchAll(def_image.regex)]
    if (matches.length === 0 || matches[0].index !== 0) return null;
    if (matches.length === 1) return image(matches[0], key);
    return {
        name: def_image.gallery.name,
        props: { key: key, ...def_image.gallery.props },
        children: matches.map((match, i) => image(match, `key-${i}`))
    }
}

function image(match: RegExpMatchArray, key: string): ComponentDef {
    const cap = match.groups!
    const imgComp = {
        name: def_image.img.name,
        props: {
            key: key, src: cap.path, alt: cap.altText,
            ...(cap.props && !def_image.wrapper ? JSON.parse(cap.props) : {}),
            ...def_image.img.props
        },
        children: null
    }
    if (def_image.wrapper) {
        return {
            name: def_image.wrapper.name,
            props: {
                key: `${key}-wrapper`,
                ...(cap.props ? JSON.parse(cap.props) : {}),
                ...def_image.wrapper.props
            },
            children: [imgComp]
        }
    } else return imgComp;
}

