import React from 'react';
import styles from './Gallery.module.scss';

const Gallery = (props) => {
    return (<div className={`${styles.gallery} ${styles.cols}`}>
        {React.Children.map(props.children, (child) => 
            React.cloneElement(child, { className: `${child.props.className} ${styles.galleryItem}` })
        )}
    </div>);
}

export default Gallery;

