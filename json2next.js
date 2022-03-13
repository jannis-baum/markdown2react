import React from "react";

import Image from 'next/image';
import Link from 'next/link';

const AllComponents = { Image, Link }

export default function json2react(jsonComp) {
    return React.createElement(
        AllComponents[jsonComp.name] ?? jsonComp.name,
        jsonComp.props,
        jsonComp.children
            ? jsonComp.children.map(child =>
                typeof child === 'string' || child instanceof String
                    ? child : json2react(child))
            : undefined
    );
}

