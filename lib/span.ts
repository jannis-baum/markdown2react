import { ComponentDef } from "../markdown2json";
import { ele_bold, prp_bold, reg_bold, reg_code, reg_italic, reg_strikethrough } from "../definitions";

let regInline = new RegExp(
    [reg_bold, reg_italic, reg_strikethrough, reg_code]
        .map((r) => r.toString().slice(1, -1))
    .join('|')
);

export default function parseSpan(span: string, parentKey: string): ComponentDef {
    const key = `${parentKey}-span`;
    return _parseInline(span, key);
}

function _parseInline(text: string, key: string, name: string = 'span', props: object = {}): ComponentDef {
    let cursor = 0;
    let match;
    const children = Array<ComponentDef | string>();
    while (match = text.slice(cursor).match(regInline)) {
        const matchIndex = match!.index! + cursor;
        children.push(text.slice(cursor, matchIndex));
        const cap = match!.groups!;
        if (cap.bold) {
            const start = matchIndex + cap.limBold!.length
            children.push(_parseInline(
                text.slice(start, start + cap.bold!.length),
                `${key}-${cursor}`,
                ele_bold, prp_bold
            ));
        }
        cursor += matchIndex + match![0].length;
    }
    if (cursor !== text.length) children.push(text.slice(cursor, text.length));
    return {
        name: name,
        props: { key: key, ...props },
        children: children
    }
}

