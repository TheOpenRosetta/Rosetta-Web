import React from 'react';

import styles from './Button.module.scss';

const Button = ({ kind = 'fill', size = 'md', children, element: CustomTag, classes, ...props }) => {
  const kindClass = styles[`btn--${kind}`];
  const sizeClass = styles[`btn--${size}`];
  if(CustomTag) {
    return <CustomTag className={`${styles.btn} ${kindClass} ${sizeClass} ${classes}`} {...props}>{children}</CustomTag>
  } else {
    return <button className={`${styles.btn} ${kindClass} ${sizeClass} ${classes}`} {...props}>{children}</button>
  }
}

export default Button;
