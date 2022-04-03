import React, { FC } from 'react';
import NextImage from 'next/image';
import styles from './Image.module.scss';

interface ImageProps {
    src: string
    alt: string
    className: string
};

const Image: FC<ImageProps> = (props: ImageProps) => {
    return (
        <div className={`${styles.imageContainer} ${props.className}`}>
            <NextImage src={props.src} alt={props.alt} layout='fill' className={styles.image}></NextImage>
        </div>
    );
};

export default Image;