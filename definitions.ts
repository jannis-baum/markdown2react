// SECTIONS
export const prp_section = (depth: number) => {
    return { className: `section-${depth}` }
};
export const ele_section = 'div';

// SPAN ELEMENTS
export const span_elements: { [key: string]: { regex: RegExp, element: string, props: object } } = {
    bold: {
        regex: /(?<boldLim>[\*\_]{2})(?<bold>.+?)\k<boldLim>/,
        element: 'b',
        props: {}
    }, italic: {
        regex: /(?<italicLim>[\*\_])(?<italic>.+?)\k<italicLim>/,
        element: 'i',
        props: {}
    }, strikethrough: {
        regex: /(?<strikethroughLim>[\~]{2})(?<strikethrough>.+?)\k<strikethroughLim>/,
        element: 's',
        props: {}
    }, code: {
        regex: /(?<codeLim>[\`]+)(?<code>.+?)\k<codeLim>/,
        element: 'code',
        props: {}
    }
}

