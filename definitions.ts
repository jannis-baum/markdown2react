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
        regex: /(?<italicLim>[\*\_])(?<italic>.+?)(?<![\*\_])\k<italicLim>(?![\*\_])/,
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

// IMAGES
export const def_image: {
    regex: RegExp,
    element: string, element_props: object,
    wrapper: string | undefined | null, wrapper_props: object | undefined | null,
    gallery_container: string, gallery_container_props: object
} = {
    regex: /!\[(?<altText>.*?)\]\((?<path>.*?)(?: "(?<title>.*?)")?\)(?<props>{.*?})?/,
    element: 'Image',
    element_props: { layout: "fill", objectFit: "contain" },
    wrapper: 'div',
    wrapper_props: { className: "image-container" },
    gallery_container: 'div',
    gallery_container_props: { className: "gallery" }
}

