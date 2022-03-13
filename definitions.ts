// SECTIONS
export const prp_section = (depth: number) => {
    return { className: `section-${depth}` }
};
export const ele_section = 'div';

// SPAN ELEMENTS
// bold
export const reg_bold = /[\*\_]{2}(?<bold>.+?)[\*\_]{2}/;
export const prp_bold = {};
export const ele_bold = 'b';
// italic
export const reg_italic = /[\*\_](?<italic>.+?)[\*\_]/;
export const prp_italic = {};
export const ele_italic = 'i';
// strikethrough
export const reg_strikethrough = /[\~]{2}(?<strikethrough>.+?)[\~]{2}/;
export const prp_strikethrough = {};
export const ele_strikethrough = 's';
// code
export const reg_code = /[\`](?<code>.+?)[\`]/;
export const prp_code = {};
export const ele_code = 'code';

