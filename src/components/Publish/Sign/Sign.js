import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeAgreement,
    selectAgreements
} from '@services/Publish/publishSlice';

import styles from './Sign.module.scss';

const Sign = () => {
  const dispatch = useDispatch();
  const values = useSelector(selectAgreements);

  return <div className={styles.sign}>
    <div className={styles.group}>
      <div className={styles.heading}>Storage fees one</div>
      <div className={styles.text}>it's being stored on a persistent distributed network that allows files to survive forever.</div>
      <div className={styles.area}>
        The storage cost for the files is <strong>$10.00</strong>
      </div>
    </div>
    <div className={styles.group}>
      <div className={styles.heading}>Agreemnent</div>
      <div className={styles.text}>Before submitting please reviw and accept the below mentioned document as well terms and conditions.</div>
      <div className={styles.checkboxes}>
        <label htmlFor="tos" className={styles.label}>
          <input type="checkbox" id="tos" value={values.tos} onChange={() => dispatch(changeAgreement({ type: 'tos' }))} />
          <span className={styles.checkbox}></span>
          <span>Agreeing to the ToS</span>
        </label>
        <label htmlFor="license" className={styles.label}>
          <input type="checkbox" id="license" value={values.license} onChange={() => dispatch(changeAgreement({ type: 'license' }))} />
          <span className={styles.checkbox}></span>
          <span>Agreeing to the <a className={styles.extLink} href="/" rel="noreferrer" target="_blank">Rosetta License</a></span>
        </label>
      </div>
    </div>
  </div>;
}

export default Sign;
