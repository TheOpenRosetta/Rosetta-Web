import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  nextStep,
  sendFirstData
} from '@services/Onboarding/onboardingSlice';
import Button from '@components/Button';

import styles from './OnboardingForm.module.scss';

const OnboardingForm = ({ className: classes }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       institution: '',
       email: ''
     },
     onSubmit: values => {
       dispatch(sendFirstData(values));
       dispatch(nextStep());
     },
   });

  return <form onSubmit={formik.handleSubmit} className={`${styles.form} ${classes}`}>
    <div className={styles.title}>See how much you’ve already earnt</div>
    <div className={styles.group}>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        className={styles.field}
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <label htmlFor="firstName" className={styles.label}>First Name</label>
    </div>
    <div className={styles.group}>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        className={styles.field}
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor="lastName" className={styles.label}>Last Name</label>
    </div>
    <div className={styles.group}>
      <input
        id="institution"
        name="institution"
        type="text"
        required
        className={styles.field}
        onChange={formik.handleChange}
        value={formik.values.institution}
      />
      <label htmlFor="institution" className={styles.label}>Institution</label>
    </div>
    <div className={styles.group}>
      <input
        id="email"
        name="email"
        type="email"
        required
        className={styles.field}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
    <label htmlFor="email" className={styles.label}>Email</label>
    </div>
    <Button classes={styles.submit} type="submit" kind="fill" size="lg">Get early access</Button>
  </form>
}

export default OnboardingForm;
