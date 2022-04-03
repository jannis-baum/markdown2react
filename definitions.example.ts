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
        regex: /(?<bold_lim>[\*\_]{2})(?<bold>.+?)\k<bold_lim>/,
        comp: { name: 'b', props: {} }
    }, italic: {
        regex: /(?<italic_lim>[\*\_])(?<italic>.+?)(?<![\*\_])\k<italic_lim>(?![\*\_])/,
        comp: { name: 'i', props: {} }
    }, strikethrough: {
        regex: /(?<striketrough_lim>[\~]{2})(?<strikethrough>.+?)\k<striketrough_lim>/,
        comp: { name: 's', props: {} }
    }, code: {
        regex: /(?<code_lim>[\`]+)(?<code>.+?)\k<code_lim>/,
        comp: { name: 'code', props: {} }
    }, link: {
        regex: /\[(?<link>.*?)\]\((?<link_href>.*?)(?: "(?<link_title>.*?)")?\)/,
        comp: { name: 'a', props: { href: '$link_href', title: '$link_title' } }
    }
}

// IMAGES
export const def_image: { regex: RegExp, img: JSONComp, wrapper: JSONComp | undefined | null, gallery: JSONComp } = {
    regex: /!\[(?<altText>.*?)\]\((?<path>.*?)(?: "(?<title>.*?)")?\)(?<props>{.*?})?/g,
    img: { name: 'Image', props: { layout: "fill", objectFit: "contain" } },
    wrapper: { name: 'div', props: { className: "image-wrapper" } },
    gallery: { name: 'div', props: { className: "gallery" } }
}
