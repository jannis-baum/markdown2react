import { ComponentDef, ParagraphParser } from '../markdown2json';
import { def_list } from '../definitions';
import { assert } from './helpers';
import parseSpan from './span';


export const parseListBlock: ParagraphParser = (para: string, key: string) => {
    const lines = para.split(/\r?\n/);
    const ret = parseSublist(lines, key);
    if (!ret) return null;
    assert(ret!.linep === lines.length, 'incorrectly formatted list');
    return ret!.list;
}

type ListInfo = {
    style: 'ul' | 'ol'
    indent: number
};
function getItemInfo(line: string): { info: ListInfo | null, content: string } {
    const match = line.match(def_list.line_regex);
    if (!match) return { info: null, content: line };
    const cap = match.groups!;
    return {
        info: {
            style: cap.ul ? 'ul' : 'ol',
            indent: cap.indent.length
        },
        content: cap.content
    }
}

function parseSublist(lines: string[], key: string, startAt: number = 0): { list: ComponentDef, linep: number } | null {
    const { info, } = getItemInfo(lines[startAt]);
    if (!info) return null;

    const items = Array<ComponentDef>();
    const getList = (): ComponentDef => {
        return {
            name: info!.style,
            props: { key: key, ...def_list[info!.style].props },
            children: items
        }
    };

    for (let lp = startAt; lp < lines.length; lp++) {
        const { info: i, content } = getItemInfo(lines[lp]);
        if (!i) { // merge line into previous item, continue
            items[items.length - 1].children!.push(...[' ', lines[lp]]);
            continue;
        }
        if (i!.indent < info.indent) return { // return with addLines including this one
            list: getList(),
            linep: lp - 1
        };
        const k = `${key}-${lp}`;
        if (i!.indent > info.indent) { // recurse into with lines including this one
            const ret = parseSublist(lines, `${k}-subl`, lp);
            assert(!!ret, 'invalid sublist');
            items.push({
                name: def_list.li_subl.name,
                props: { key: k, ...def_list.li_subl.props },
                children: [ret!.list]
            });
            lp = ret!.linep;
            continue;
        }

        // assert(i!.style === info.style, 'non-matching list styles');
        // create new li, delete line
        parseSpan
        items.push({
            name: def_list.li.name,
            props: { key: k, ...def_list.li.props },
            children: [parseSpan(content, k)]
        });
    }

    // return ol or ul by info.style with content
    return {
        list: getList(),
        linep: lines.length
    };
}

