import React from 'react';
import Button from '@components/Button';
import Avatar from '@components/Avatar';
import styles from './FollowCard.module.scss';

const FollowCard = ({ photo, name, click, followed, description, className }) => {
  return <div className={`${styles.followCard} ${className}`}>
    <Avatar src={photo} title={name} classes={styles.photo} size="lg" />
    <div className={styles.name}>{name}</div>
    <div className={styles.description}>{description}</div>
    {
      followed ?
        <Button classes={styles.btn} kind="bordered" size="sm" onClick={click}>Unfollow</Button>
        :
        <Button classes={styles.btn} kind="outline" size="sm" onClick={click}>Follow</Button>
    }
  </div>;
}

export default FollowCard;
