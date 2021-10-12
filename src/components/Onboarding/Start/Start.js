import React from 'react';
import { useDispatch } from 'react-redux';
import Logo from '@components/Logo';
import Button from '@components/Button';
import {
  nextStep,
} from '@services/Onboarding/onboardingSlice';

import {ReactComponent as ChartIcon} from '@assets/lightIcons/Chart.svg';
import {ReactComponent as ProfileIcon} from '@assets/lightIcons/Profile.svg';
import {ReactComponent as StarIcon} from '@assets/lightIcons/Star.svg';
import {ReactComponent as WalletIcon} from '@assets/lightIcons/Wallet.svg';

import styles from './Start.module.scss';

const steps = [
  { title: 'Check Past Rewards', subtitle: 'Storage Fees for persistent', icon: <StarIcon /> },
  { title: 'Create Rosetta Wallet', subtitle: 'Storage Fees for persistent', icon: <WalletIcon /> },
  { title: 'Profile Creation', subtitle: 'Storage Fees for persistent', icon: <ProfileIcon /> },
  { title: 'Publish & Earn', subtitle: 'Storage Fees for persistent', icon: <ChartIcon /> }
]

const Start = () => {
  const dispatch = useDispatch();

  return <div className={styles.start}>
    <div className={styles.logo}><Logo inverse={true} /></div>
    <div className={styles.steps}>
      { steps.map(item => <div className={styles.step}>
        <div className={styles.stepIcon}>{item.icon}</div>
        <div className={styles.stepTitle}>{item.title}</div>
        <div className={styles.stepSubtitle}>{item.subtitle}</div>
      </div>) }
    </div>
    <div className={styles.main}>
      <div className={styles.title}>Get Started with Roseta</div>
      <div className={styles.text}>Rosetta is an open source social network full of open access authors like yourself. You earn from publishing replicable research, and reproducing other authors work to ensure truthfulness. Let’s learn how to setup your wallet, claim your past rewards, and get you started.</div>
      <Button onClick={() => dispatch(nextStep())} size="lg" kind="fill" classes={styles.btn}>Get started</Button>
    </div>
  </div>;
}

export default Start;
