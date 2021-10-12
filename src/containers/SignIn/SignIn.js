import React from 'react';
import SignInForm from '@forms/SignInForm';

import styles from './SignIn.module.scss';

const SignIn = () => {
  return <div className={styles.page}>
    <SignInForm className={styles.form} />
  </div>
}

export default SignIn;
