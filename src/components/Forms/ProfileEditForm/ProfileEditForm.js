// import { useState, useCallback } from 'react';
// import Button from '@components/Button';
// import {useDropzone} from 'react-dropzone';
// import { useFormik } from 'formik';
//
// import { ReactComponent as EditIcons } from '@assets/icons/edit_profile.svg';
// import styles from './ProfileEditForm.module.scss';

const ProfileEditForm = ({ data, save }) => {
 //  const formik = useFormik({
 //   initialValues: {
 //     photo: data.photo,
 //     firstName: data.firstName,
 //     bio: data.bio
 //   },
 //   onSubmit: (values) => save(values),
 // });
 //
 // const onDrop = useCallback(acceptedFiles => {
 //   const file = acceptedFiles[0];
 //   setPhoto(URL.createObjectURL(file));
 //   action(file);
 // }, [action])
 //
 // const {getRootProps, getInputProps} = useDropzone({
 //   onDrop,
 //   accept: 'image/jpg, image/jpeg, image/png, image/gif',
 //   maxFiles: 1
 // })
 //
 //  return <form onSubmit={formik.handleSubmit} {...getRootProps()} className={styles.form}>
 //    <div className={styles.header}>
 //      <div className={styles.headerTitle}>Edit profile</div>
 //      <Button classes={styles.submit} type="submit" size="sm" kind="fill">Save</Button>
 //    </div>
 //    <div className={styles.group}>
 //      <div className={styles.dropzoneImg} style={{backgroundImage: `url(${formik.values.photo})`}}>
 //        <EditIcons />
 //      </div>
 //    </div>
 //    <div className={styles.group}>
 //      <input
 //        id="firstName"
 //        name="firstName"
 //        type="text"
 //        required
 //        className={styles.field}
 //        onChange={formik.handleChange}
 //      />
 //      <label htmlFor="firstName" className={styles.label}>First Name</label>
 //    </div>
 //    <div className={styles.group}>
 //      <textarea
 //        id="biouser"
 //        name="bio"
 //        type="text"
 //        required
 //        className={styles.textarea}
 //        onChange={formik.handleChange}
 //      />
 //      <label htmlFor="bio" className={styles.label}>Bio</label>
 //    </div>
 //  </form>
}

export default ProfileEditForm;
