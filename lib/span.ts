import { ComponentDef } from "../markdown2json";
import { span_elements } from "../definitions";
import { parseCapturedProps } from "./helpers";

let regInline = new RegExp(
    Object.keys(span_elements).map((key) =>
        span_elements[key].regex.toString().slice(1, -1)
    ).join('|')
);

export function parseSpan(span: string, parentKey: string): ComponentDef {
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
        const [format, content] = Object.entries(cap).find(([key, val]) => val && key in span_elements)!;

        children.push(_parseInline(
            content,
            `${key}-${cursor}`,
            span_elements[format].comp.name,
            parseCapturedProps(span_elements[format].comp.props, cap)
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

