import React from 'react';

import styles from './Avatar.module.scss';

const Avatar = ({ src, title = 'avatar', kind = 'default', size = 'md', element: CustomTag, classes, ...props }) => {
  const kindClass = styles[`avatar--${kind}`];
  const sizeClass = styles[`avatar--${size}`];
  if(CustomTag) {
    return <CustomTag className={`${styles.avatar} ${kindClass} ${sizeClass} ${classes}`} {...props}>
      <img src={src} alt={title} />
    </CustomTag>
  } else {
    return <div className={`${styles.avatar} ${kindClass} ${sizeClass} ${classes}`} {...props}>
      <img src={src} alt={title} />
    </div>
  }
}

export default Avatar;
