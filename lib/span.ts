import { ComponentDef } from "../markdown2json";
import { span_elements } from "../definitions";

let regInline = new RegExp(
    Object.keys(span_elements).map((key) =>
        span_elements[key].regex.toString().slice(1, -1)
    ).join('|')
);

export default function parseSpan(span: string, parentKey: string): ComponentDef {
    const key = `${parentKey}-span`;
    return _parseInline(span.replace(/\s+/g, ' '), key);
}

function _parseInline(text: string, key: string, name: string = 'span', props: object = {}): ComponentDef {
    let cursor = 0;
    let match;
    const children = Array<ComponentDef | string>();
    while (match = text.slice(cursor).match(regInline)) {
        const matchIndex = match!.index! + cursor;
        children.push(text.slice(cursor, matchIndex));

        const cap = match!.groups!;
        const [format, content] = Object.entries(cap).find(([key, val]) => val && !key.endsWith('Lim'))!;
        const start = matchIndex + cap[`${format}Lim`]!.length;

        children.push(_parseInline(
            text.slice(start, start + content.length),
            `${key}-${cursor}`,
            span_elements[format].comp.name, span_elements[format].comp.props
        ));
        cursor = matchIndex + match![0].length;
    }
    if (cursor !== text.length) children.push(text.slice(cursor, text.length));
    return {
        name: name,
        props: { key: key, ...props },
        children: children
    }
}

