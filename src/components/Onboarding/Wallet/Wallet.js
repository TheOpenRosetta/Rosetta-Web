import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useArjs } from 'arjs-react';
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
  const [extExist, setExtExist] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const wallet = useArjs();
  const permission = { permissions: ["SIGN_TRANSACTION"] }
  const activate = (connector, key) => wallet.connect(connector, key);;

  const loadedHandler = () => {
    if (wallet.connect) {
      setExtExist(true);
    }
  };

  useEffect(() => {
    window.addEventListener("arweaveWalletLoaded", loadedHandler);
    return () => {
      window.removeEventListener("arweaveWalletLoaded", loadedHandler);
    }
  }, []);

  const [balance, setBalance] = useState("Requesting...");
  const [address, setAddress] = useState("Requesting...");

  wallet.ready(() => {
    if(wallet.status === "connected")(async () => {
      setError('');
      setBalance(wallet.getArweave().ar.winstonToAr(await wallet.getBalance("self")))
      setAddress(await wallet.getAddress());
    })()
  })

  const next = async () => {
    if(wallet.status === "connected") {
      const address = await wallet.getAddress();
      dispatch(setPublicKey(address));
      dispatch(nextStep());
    } else {
      setError('Error: connect to ArConnect before the next step');
    }
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
              <a className={styles.extentionChrome} href="https://chrome.google.com/webstore/detail/arconnect/einnioafmpimabjcddiinlhmijaionap" rel="noreferrer" target="_blank">Chrome</a>
              <a className={styles.extentionFirefox} href="https://addons.mozilla.org/en-GB/firefox/addon/arconnect/" rel="noreferrer" target="_blank">Firefox</a>
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

    <div className={styles.row}>
      <div className={styles.col}>
        {extExist && (wallet.status === "connected" ? (
          <div className={styles.connected}>
            <div className={styles.connectedText}>
              Account:
              <span className={styles.connectedTextAddress}>{address}</span>
            </div>
            <div className={styles.connectedText}>
              Balance:
              <span className={styles.connectedTextBalance}>{balance}</span>
            </div>
            <Button kind="bordered" size="sm" onClick={() => wallet.disconnect()}>disconnect</Button>
          </div>
        ) : (
          <div className={styles.connect}>
            <div className={styles.connectText}>Connect:</div>
            <Button kind="fill" size="sm" onClick={() => activate('arconnect', permission)}>ArConnect</Button>
          </div>
        ))}
      </div>
    </div>

    <div className={styles.actions}>
      { error ? <span className={styles.error}>{error}</span> : null }
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
      <Button classes={styles.next} kind="fill" size="lg" onClick={next}>Next</Button>
    </div>
  </div>
}

export default Wallet;
