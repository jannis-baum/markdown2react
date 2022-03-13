// SECTIONS
export const prp_section = (depth: number) => {
    return { className: `section-${depth}` }
};
export const ele_section = 'div';

// SPAN ELEMENTS
// bold
export const reg_bold = /(?<limBold>[\*\_]{2})(?<bold>.+?)\k<limBold>/;
export const prp_bold = {};
export const ele_bold = 'b';
// italic
export const reg_italic = /(?<limItalic>[\*\_])(?<italic>.+?)\k<limItalic>/;
export const prp_italic = {};
export const ele_italic = 'i';
// strikethrough
export const reg_strikethrough = /(?<limStrikethrough>[\~]{2})(?<strikethrough>.+?)\k<limStrikethrough>/;
export const prp_strikethrough = {};
export const ele_strikethrough = 's';
// code
export const reg_code = /(?<limCode>[\`]+)(?<code>.+?)\k<limCode>/;
export const prp_code = {};
export const ele_code = 'code';

