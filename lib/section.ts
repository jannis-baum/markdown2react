import { ComponentDef } from "../markdown2json";
import { cls_section } from "../definitions";

export default function section(paras: Array<ComponentDef>): ComponentDef {
    return _section(paras, 'section-body');
}

function _section(innerParas: Array<ComponentDef>, key: string, depth: number = 0): ComponentDef {

    let sectionParas = Array<ComponentDef>();
    let childSED = _firstChildStartEndDepth(innerParas, 1);

    if (!childSED) {
        sectionParas = innerParas;
    } else {
        sectionParas.push(...innerParas.slice(0, childSED!.start));
        let childIndex = 0;
        while (childSED) {
            sectionParas.push(_section(
                innerParas.slice(childSED!.start, childSED!.end),
                `${key}-${childIndex++}`, childSED!.depth))
            childSED = _firstChildStartEndDepth(innerParas, childSED!.end);
        }
    }

    return {
        name: 'div',
        props: { key: key, className: cls_section(depth) },
        children: sectionParas
    }
}

function _firstChildStartEndDepth(innerParas: Array<ComponentDef>, startingAt: number = 0):
{ start: number, end: number, depth: number } | null {
    if (innerParas.length === 0) return null;

    const paraMatches = innerParas.slice(startingAt).map((para) => para.name.match(/h(\d)/))
    const childStart = paraMatches.findIndex((match) => match);
    if (childStart === -1) return null;

    const childDepth = parseInt(paraMatches[childStart]![1])!;
    let childEnd = paraMatches.slice(childStart + 1).findIndex(
        (match) => match && parseInt(match![1])! <= childDepth
    )
    return { start: childStart + startingAt, depth: childDepth,
        end: childEnd === -1 ? innerParas.length : (childEnd + startingAt + childStart + 1)
    }
}


