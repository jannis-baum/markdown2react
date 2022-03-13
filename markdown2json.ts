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

function parseSpan(span: string, paraKey: string): ComponentDef {
    const key = `${paraKey}-span`
    return {
        name: 'span',
        props: { key: key },
        children: [span]
    }
}

function section(paras: Array<ComponentDef>): ComponentDef {
    return {
        name: 'div',
        props: { key: 'section-0', className: 'section-0'},
        children: paras
    }
}

export function parseMarkdown(markdown: string): ComponentDef {
    const paras = markdown.split(/\r?\n(?:\s*\r?\n)+/).map(
        (paraString, idx) => parseParagraph(paraString, idx)
    );
    return section(paras);
}

