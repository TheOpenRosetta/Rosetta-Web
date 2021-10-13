import React from 'react';
import Status from '../Status';
import OnboardingForm from '@forms/OnboardingForm';

import styles from './UserData.module.scss';

const UserData = () => {
  return <div className={styles.content}>
    <Status />
    <OnboardingForm />
  </div>;
}

export default UserData;
