import React, { useState } from 'react';
import Button from '@components/Button';
import { useFormik } from 'formik';

import styles from './AddCoAuthorForm.module.scss';

const AddCoAuthorForm = ({ className, add, close }) => {
  const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     onSubmit: (values) => {
       add(values);
     },
   });

  return <form onSubmit={formik.handleSubmit} className={`${styles.form} ${className}`}>
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
    <div className={styles.actions}>
      <Button classes={styles.cancel} size="md" kind="outline" type="reset" onClick={close}>Cancel</Button>
      <Button classes={styles.submit} type="submit" kind="completed" size="md">Add new author</Button>
    </div>
  </form>
}

export default AddCoAuthorForm;
