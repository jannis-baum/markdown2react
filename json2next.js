import React from "react";
import { parseStyleModules } from './lib/helpers'

import Image from 'next/image';
import Link from 'next/link';
const AllComponents = { Image, Link }

export default function json2react(jsonComp, styleModules = undefined) {
    const compDef = styleModules ? parseStyleModules(jsonComp, styleModules) : jsonComp;
    return React.createElement(
        AllComponents[compDef.name] ?? compDef.name,
        compDef.props,
        compDef.children
            ? compDef.children.map(child =>
                typeof child === 'string' || child instanceof String
                    ? child : json2react(child, styleModules))
            : undefined
    );
}

