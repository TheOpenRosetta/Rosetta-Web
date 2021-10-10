import React from 'react';

import styles from './Area.module.scss';

const Area = ({ header, content, footer, classes, contentClasses, headerClasses, footerClasses }) => <div className={`${styles.area} ${classes || ''}`}>
  { header && <header className={`${styles.header} ${headerClasses || ''}`}>{header}</header> }
  { content && <div className={`${styles.content} ${contentClasses || ''}`}>{content}</div> }
  { footer && <footer className={`${styles.footer} ${footerClasses || ''}`}>{footer}</footer> }
</div>;

export default Area;
