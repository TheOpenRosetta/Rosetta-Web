import React from 'react';
import Layout from '@components/Layout';
import { useSelector } from 'react-redux';
import {
  selectStep,
} from '@services/Publish/publishSlice';

import {
  Start,
  Status,
  ReseachOutput,
  Citation,
  Coauthors,
  Sign,
  Complete
} from '@components/Publish';

import styles from './Publish.module.scss';

const Publish = () => {
  const step = useSelector(selectStep);

  return <Layout format="full" navigation={true}>
    <div className={styles.publish}>
      <div className={styles.status}>
        <Status />
      </div>
      <div className={styles.content}>
        {step === 0 && <Start />}
        {step === 1 && <ReseachOutput />}
        {step === 2 && <Citation />}
        {step === 3 && <Coauthors />}
        {step === 4 && <Sign />}
        {step === 5 && <Complete />}
      </div>
    </div>
  </Layout>
}

export default Publish;
