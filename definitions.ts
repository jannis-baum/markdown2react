export type jsonComp = { name: string, props: object }

// SECTIONS
export const prp_section = (depth: number) => {
    return { className: `section-${depth}` }
};
export const ele_section = 'div';

// SPAN ELEMENTS
export const span_elements: { [key: string]: { regex: RegExp, comp: jsonComp } } = {
    bold: {
        regex: /(?<boldLim>[\*\_]{2})(?<bold>.+?)\k<boldLim>/,
        comp: { name: 'b', props: {} }
    }, italic: {
        regex: /(?<italicLim>[\*\_])(?<italic>.+?)(?<![\*\_])\k<italicLim>(?![\*\_])/,
        comp: { name: 'i', props: {} }
    }, strikethrough: {
        regex: /(?<strikethroughLim>[\~]{2})(?<strikethrough>.+?)\k<strikethroughLim>/,
        comp: { name: 's', props: {} }
    }, code: {
        regex: /(?<codeLim>[\`]+)(?<code>.+?)\k<codeLim>/,
        comp: { name: 'code', props: {} }
    }
}

// IMAGES
export const def_image: { regex: RegExp, img: jsonComp, wrapper: jsonComp | undefined | null, gallery: jsonComp } = {
    regex: /!\[(?<altText>.*?)\]\((?<path>.*?)(?: "(?<title>.*?)")?\)(?<props>{.*?})?/g,
    img: { name: 'Image', props: { layout: "fill", objectFit: "contain" } },
    wrapper: { name: 'div', props: { className: "image-wrapper" } },
    gallery: { name: 'div', props: { className: "gallery" } }
}

