import { PropsDef } from "../definitions";
import { ComponentDef } from "../markdown2json";
import { exit } from "process";

export function mergeProps(props1: PropsDef, props2: PropsDef): PropsDef {
    let keys1 = new Set(Object.keys(props1));
    let keys2 = new Set(Object.keys(props2));
    const intersect = [...keys2].filter((key) => keys1.has(key));
    for (const key of intersect) {
        keys1.delete(key); keys2.delete(key);
    }
    
    if (intersect.length === 0) return { ...props1, ...props2 };
    if (intersect.length > 1 || intersect[0] !== 'className') {
        console.error(`fatal: unable to merge multiple definitions of ${intersect.filter((key) => key !== 'className')}.`);
        exit(1);
    }
    let merge: PropsDef = {};
    for (const key of keys1) merge[key] = props1[key];
    for (const key of keys2) merge[key] = props2[key];
    for (const key of intersect) merge[key] = `${props1[key]} ${props2[key]}`;
    return merge;
}

export function parseCapturedProps(props: PropsDef, cap: { [key: string]: string }): PropsDef {
    return Object.fromEntries(
        Object.entries(props).map(([key, value]) => [
            key, value.startsWith('$') && value.slice(1) in cap
                ? cap[value.slice(1)]
                : value
        ]).filter(([, value]) => value)
    )
}

type styleModule = { [key: string]: string };
export function parseStyleModules(jsonComp: ComponentDef, styleModules: {[key: string]: styleModule }): ComponentDef {
    if (!('className' in jsonComp.props)) {
        return jsonComp
    }
    const className = jsonComp.props.className.split(' ').map((name: string) => {
        const match = name.match(/^(?<module>[^.]*)\.(?<style>[^.]*)/);
        if (!match) return name;
        const module = match!.groups!.module!;
        const style = match!.groups!.style!;
        if (!(module in styleModules) || !(style in styleModules[module])) return name;
        return styleModules[module]![style];
    }).join(' ');
    return {
        name: jsonComp.name,
        props: {
            ...jsonComp.props,
            className: className
        },
        children: jsonComp.children
    }
}

