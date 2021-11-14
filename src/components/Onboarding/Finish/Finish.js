import React from 'react';
import {
  Link
} from "react-router-dom";
import Button from '@components/Button';
import Status from '../Status';

import styles from './Finish.module.scss';

const Finish = () => {
  return <div className={styles.finish}>
    <Status />
    <div className={styles.title}>Ready to publish your first paper?</div>
    <div className={styles.subtitle}>Start exploring, or publish your first paper on Rosetta.</div>

    <div className={styles.actions}>
      <Button element={Link} to="/publish" classes={styles.btn} kind="fill" size="lg">Publish</Button>
      <Button  element={Link} to="/" classes={styles.btn} kind="secondary" size="lg">Explore</Button>
    </div>
  </div>;
}

export default Finish;
