import React, { useState, useEffect } from 'react';
import { useArjs } from 'arjs-react';
import Button from '@components/Button';

import { useSelector, useDispatch } from 'react-redux';
import {
  signIn,
  selectStatus,
} from '@services/Auth/authSlice';

import styles from './SignInForm.module.scss';

const SignInForm = ({ className: classes }) => {
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const [extExist, setExtExist] = useState(false);
  const [error, setError] = useState('');
  const wallet = useArjs();

  const permission = { permissions: ["SIGN_TRANSACTION"] }
  const activate = (connector, key) => wallet.connect(connector, key);;

  const loadedHandler = () => {
    if (window.arweaveWallet) {
      setExtExist(true);
    }
  };

  useEffect(() => {
    loadedHandler();
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

  const signInAction = async () => {
    if(wallet.status === "connected") {
      const address = await wallet.getAddress();
      dispatch(signIn({ key: address }));
    } else {
      setError('Error: connect to ArConnect before login');
    }
  }

  console.log(status);
  console.log(wallet);

  return <div className={`${styles.form} ${classes}`}>
    <div className={styles.title}>Login</div>
    <div className={styles.text}>Use ArConnect for connecting to Rosetta</div>
    <div className={styles.content}>
      {extExist && (wallet.status === "connected" && (
        <div className={styles.connected}>
          <div className={styles.connectedText}>
            Account:
            <span className={styles.connectedTextAddress}>{address}</span>
          </div>
          <div className={styles.connectedText}>
            Balance:
            <span className={styles.connectedTextBalance}>{balance}</span>
          </div>
        </div>
      ))}
    </div>
    {
      error && <div className={styles.error}>{error}</div>
    }
    <div className={styles.actions}>
      {
        (extExist && wallet.status === "connected") ? <>
          <Button kind="bordered" size="md" onClick={() => wallet.disconnect()}>Disconnect</Button>
          <Button size="md" classes={styles.submit} type="button" onClick={() => signInAction()}>Login</Button>
        </> :
          <Button kind="fill" size="sm" onClick={() => activate('arconnect', permission)}>ArConnect</Button>
     }
    </div>
  </div>
}

export default SignInForm;
