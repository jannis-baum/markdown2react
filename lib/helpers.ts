import { PropsDef } from "../definitions";
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

