import { parseSpan } from './lib/span'
import { section } from './lib/section'
import { parseImageBlock } from './lib/img'
import { parseListBlock } from './lib/list'

export type ComponentDef = {
    name: string,
    props: {
        key: string,
        [prop: string]: any
    },
    children: Array<ComponentDef | string> | null
}
export type ParagraphParser = (para: string, key: string) => ComponentDef | null;

function parseParagraph(para: string, idx: number): ComponentDef {
    const key = `para-${idx}`
    for (const parser of [parseImageBlock, parseListBlock]) {
        const result = parser(para, key);
        if (result) return result;
    }
    const headingMatch = para.match(/^(#+)/)
    return {
        name: headingMatch ? `h${headingMatch[1].length}` : 'p',
        props: { key: key },
        children: [parseSpan(
            para.slice(headingMatch ? headingMatch[1].length : 0).trim(),
            key
        )]
    }
}

export function parseMarkdown(markdown: string): ComponentDef {
    const paras = markdown.split(/\r?\n(?:\s*\r?\n)+/).filter((para) => para !== '').map(
        (paraString, idx) => parseParagraph(paraString, idx)
    );
    return section(paras);
}

