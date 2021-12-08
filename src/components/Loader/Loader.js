import React from 'react';

import styles from './Loader.module.scss'

import {ReactComponent as LoaderIcon} from '@assets/icons/loader-outline.svg';

const Loader = ({ darkMode }) => (
  <div className={`${styles.loader} ${darkMode ? styles.loaderInverse : ''}`}>
    <LoaderIcon />
  </div>
);

export default Loader;
