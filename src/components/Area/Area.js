import React from 'react';

import styles from './Area.module.scss';

const Area = ({ header, content, classes, contentClasses, headerClasses }) => <div className={`${styles.area} ${classes}`}>
  <header className={`${styles.header} ${headerClasses}`}>{header}</header>
  <div className={`${styles.content} ${contentClasses}`}>{content}</div>
</div>;

export default Area;
