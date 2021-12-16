import React from 'react';

import styles from './Player.module.scss';

const Player = ({ file }) => {
  return <div className={styles.player}>
    <audio controlsList="nodownload" controls>
      <source src={file} type="audio/mpeg" />
      Your browser does not support the
            <code>audio</code> element.
    </audio>
  </div>
}

export default Player;
