import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Arweave from 'arweave';
import {
  setPublicKey,
  prevStep,
  nextStep
} from '@services/Onboarding/onboardingSlice';
import Button from '@components/Button';
import Status from '../Status';
import styles from './Wallet.module.scss';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-ios-back-outline.svg'

const Wallet = () => {
  const [publickey, setPublickey] = useState('');
  const dispatch = useDispatch();
  const arweave = Arweave.init({});

  useEffect(() => {
    arweave.wallets.generate().then((key) => {
      arweave.wallets.jwkToAddress(key).then((address) => {
          setPublickey(address);
      });
    });
  }, []);

  const next = () => {
    dispatch(setPublicKey(publickey));
    dispatch(nextStep());
  }

  return <div className={styles.wallet}>
    <Status />
    <div className={styles.title}>Create Rosetta Wallet</div>
    <div className={styles.subtitle}>ArConnect is your passport to the Rosetta ecosystem</div>

    <div className={styles.row}>
      <div className={styles.col}>
        <header className={styles.header}>Download & Setup</header>
        <div className={styles.body}>
          <div className={styles.extention}>
            <div className={styles.extentionHeading}>Extention</div>
            <div className={styles.extentionLinks}>
              <Button classes={styles.extentionChrome} element={Link} to="#" target="_blank" kind="outline" size="md">Chrome</Button>
              <Button classes={styles.extentionFirefox} element={Link} to="#" target="_blank" kind="outline" size="md">Firefox</Button>
            </div>
          </div>
          <div className={styles.mobile}>
            <div className={styles.mobileHeading}>Mobile App</div>
            <div className={styles.mobileLinks}>
              <span className={styles.mobileLinksNone}>Comming Soon</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.col}>
        <header className={styles.header}>Create your ArConnect Address</header>
        <div className={styles.body}>
          <div className={styles.arconnectTitle}>What is ArConnect used for?</div>
          <ul className={styles.arconnectList}>
            <li className={styles.arconnectItem}>Storing digital assets such as your paper tokens</li>
            <li className={styles.arconnectItem}>Paying for permanent archiving when you publish a paper</li>
          </ul>
        </div>
      </div>
    </div>

    <div className={styles.actions}>
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
      <Button classes={styles.next} kind="fill" size="lg" onClick={next}>Next</Button>
      <Button classes={styles.skip} kind="secondary" size="lg" onClick={() => dispatch(nextStep())}>Skip</Button>
    </div>
  </div>;
}

export default Wallet;
