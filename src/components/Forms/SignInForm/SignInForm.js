import React from 'react';
import { useFormik } from 'formik';
import Button from '@components/Button';

import styles from './SignInForm.module.scss';

const SignInForm = ({ className: classes }) => {
  const formik = useFormik({
     initialValues: {
       author: '',
     },
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });

  return <form onSubmit={formik.handleSubmit} className={`${styles.form} ${classes}`}>
    <div className={styles.title}>Login</div>
    <Button size="lg" classes={styles.submit} type="submit">Login</Button>
  </form>
}

export default SignInForm;
