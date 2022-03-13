export type ComponentDef = {
    name: string,
    props: {
        key: string,
        [prop: string]: any
    },
    children: [ComponentDef] | null
}

const placeholder: ComponentDef = {
    name: 'placeholder', props: { key: '0' }, children: null
}

function parseParagraph(para: string): ComponentDef {
    return placeholder;
}

function parseSpan(span: string): ComponentDef {
    return placeholder;
}

function section(paras: Array<ComponentDef>): ComponentDef {
    return placeholder;
}

export function parseMarkdown(markdown: string): ComponentDef {
    const paras = markdown.split(/\r?\n(\s*\r?\n)+/).map(
        (paraString) => parseParagraph(paraString)
    );
    return section(paras);
}

