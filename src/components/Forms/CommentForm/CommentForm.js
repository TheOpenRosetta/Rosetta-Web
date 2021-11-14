import React from 'react';
import { useFormik } from 'formik';
import Button from '@components/Button';
// import { useDispatch } from 'react-redux';

import styles from './CommentForm.module.scss';

const CommentForm = ({ className: classes }) => {
  // const dispatch = useDispatch();
  const formik = useFormik({
     initialValues: {
       msg: '',
     },
     onSubmit: (values) => {
       console.log(values.msg);
     },
   });

  return <form onSubmit={formik.handleSubmit} className={`${styles.form} ${classes}`}>
    <textarea
      id="comment"
      name="msg"
      placeholder="Comment here"
      className={styles.field}
      onChange={formik.handleChange}
      value={formik.values.msg}
    />
    <Button classes={styles.submit} type="submit" size="md" kind="fill">Comment</Button>
  </form>
}

export default CommentForm;
