import { ComponentDef } from "../markdown2json";
import { reg_bold, reg_code, reg_italic, reg_strikethrough } from "../definitions";

let reg_inline = new RegExp(
    [reg_bold, reg_italic, reg_strikethrough, reg_code]
        .map((r) => r.toString().slice(1, -1))
    .join('|')
);

export default function parseSpan(span: string, parentKey: string): ComponentDef {
    const key = `${parentKey}-span`;
    return _parseInline(span, key);
}

function _parseInline(text: string, key: string): ComponentDef {
    const match = text.match(reg_inline);
    console.log(reg_inline);
    console.log(match);
    return {
        name: 'span',
        props: { key: key },
        children: [text]
    }
}

