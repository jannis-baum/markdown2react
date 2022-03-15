export type PropsDef = { [key: string]: any };
export type JSONComp = { name: string, props: PropsDef };

// SECTIONS
export const prp_section = (depth: number) => {
    return { className: `section-${depth}` }
};
export const ele_section = 'div';

// SPAN ELEMENTS
export const span_elements: { [key: string]: { regex: RegExp, comp: JSONComp } } = {
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
export const def_image: { regex: RegExp, img: JSONComp, wrapper: JSONComp | undefined | null, gallery: JSONComp } = {
    regex: /!\[(?<altText>.*?)\]\((?<path>.*?)(?: "(?<title>.*?)")?\)(?<props>{.*?})?/g,
    img: { name: 'Image', props: { layout: "fill", objectFit: "contain" } },
    wrapper: { name: 'div', props: { className: "image-wrapper" } },
    gallery: { name: 'div', props: { className: "gallery" } }
}

