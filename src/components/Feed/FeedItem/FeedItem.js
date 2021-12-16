import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Area from '@components/Area';
import Avatar from '@components/Avatar';
import { Funding, Podcast, Paper } from './Content';

import {ReactComponent as LikeIcon} from '@assets/lightIcons/Heart.svg';
import {ReactComponent as CommentIcon} from '@assets/lightIcons/Chat.svg';

import styles from './FeedItem.module.scss';

// dummy data
import userImg from '@assets/dummy/user.png';

const FeedItem = ({ data, className }) => {
  const history = useHistory();

  const { author, content } = data;
  const [liked, setLiked] = useState(data.liked);

  const contentRender = (type) => {
    switch (type) {
      case 'podcast':
        return <Podcast data={content} />
      case 'funding':
        return <Funding data={content} />
      default:
        return <Paper data={content} />
    }
  }

  const likeAction = () => {
    setLiked(!liked);
  }

  const commentAction = () => {
    history.push(`/feed/comments/${data.postId}`);
  }

  const areaContent = <>
    <div className={styles.post}>
      <div className={styles.photo}>
        <Avatar src={author.photo || userImg} title={`${author.firstName} ${author.lastName}`} size="md" />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.name}>{author.firstName} {author.lastName}</div>
          <div className={styles.username}>(
              <Link to={`/${author.firstName}_${author.lastName}`} className={styles.usernameLink}>@{author.username}</Link>)</div>
        </div>
        <div className={styles.content}>
          {contentRender(data.type)}
        </div>
      </div>
    </div>
  </>;
  const areaFooter = <>
    <div className={styles.footer}>
      <button className={styles.btn} onClick={commentAction}><CommentIcon/> Comment</button>
      <button className={`${styles.btn} ${liked ? styles.btnLiked : ""}`} onClick={likeAction}><LikeIcon/> Like</button>
    </div>
  </>;

  return <div className={`${styles.item} ${className}`}>
    <Area content={areaContent} footer={areaFooter} />
  </div>;
};

export default FeedItem;
