import React from 'react';

import styles from './Loader.module.scss'

import {ReactComponent as LoaderIcon} from '@assets/icons/loader-outline.svg';

const Loader = () => (
  <div className={styles.loader}>
    <LoaderIcon />
  </div>
);

export default Loader;
