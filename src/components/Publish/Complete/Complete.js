import React from 'react';
import Button from '@components/Button';
import {
  Link,
} from "react-router-dom";

import {ReactComponent as CheckmarkIcon}  from '@assets/icons/checkmark-outline.svg'
import styles from './Complete.module.scss';

const Complete = () => {
  return <div className={styles.complete}>
    <div className={styles.completeContent}>
      <div className={styles.completeContentIcon}><CheckmarkIcon /></div>
      <div className={styles.completeContentTitle}>Your paper published successfully</div>
      <div className={styles.completeContentText}>The paper will be avaliable in near future.</div>
      <Button element={Link} kind="fill" size="lg" to="/">Go to home</Button>
    </div>
  </div>;
}

export default Complete;
