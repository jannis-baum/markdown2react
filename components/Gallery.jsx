import React, { useState } from 'react';
import styles from './Gallery.module.scss';

const Gallery = (props) => {
    const [bigImageIdx, setBigImageIdx] = useState(null);
    const children = React.Children.toArray(props.children);
    return (<>
        {bigImageIdx !== null && <div onClick={ () => setBigImageIdx(null) } className={styles.bigImageContainer}>
            <div onClick={(e) => { e.stopPropagation() }}>
                {React.cloneElement(children[bigImageIdx], { className: styles.bigImage })}
            </div>
        </div>}

        <div className={`${styles.gallery} ${styles.cols}`}>
            {children.map((child, i) => (
                <div key={child.key} onClick={() => { setBigImageIdx(i) }}>
                    {React.cloneElement(child, { className: styles.galleryItem })}
                </div>
            ))}
        </div>
    </>);
}

export default Gallery;

