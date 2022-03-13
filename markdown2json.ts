import section from "./lib/section"

export type ComponentDef = {
    name: string,
    props: {
        key: string,
        [prop: string]: any
    },
    children: Array<ComponentDef | string> | null
}

function parseParagraph(para: string, idx: number): ComponentDef {
    const key = `para-${idx}`
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

function parseSpan(span: string, parentKey: string): ComponentDef {
    const key = `${parentKey}-span`
    return {
        name: 'span',
        props: { key: key },
        children: [span]
    }
}

export function parseMarkdown(markdown: string): ComponentDef {
    const paras = markdown.split(/\r?\n(?:\s*\r?\n)+/).filter((para) => para !== '').map(
        (paraString, idx) => parseParagraph(paraString, idx)
    );
    return section(paras);
}

