import React, { useState, useEffect } from 'react';

import styles from './Player.module.scss';
import podcastImg from '@assets/podcast.png';

import { ReactComponent as WaveIcon } from '@assets/wave.svg';

import { ReactComponent as PlayIcon } from '@assets/icons/play-solid.svg';
import { ReactComponent as PauseIcon } from '@assets/icons/pause.svg';

const Player = ({ file }) => {
  const [init, setInit] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (init) {
      const instance = new Audio(file);
      setAudio(instance)
    }
  }, [init, file])

  useEffect(() => {
    console.log(audio);
  }, [audio])

  const playAction = () => {
    if (!init) {
      setInit(true);
    }
    setPlaying(!playing);
  }

  return <div className={styles.player}>
    <div className={styles.playerLogo}>
      <img src={podcastImg} alt="Podcast"/> <span>Podcast</span>
    </div>
    {
      init ?
        <div className={styles.playerStatus}>
          Status
        </div>
        :
        <div className={styles.playerWave}><WaveIcon/></div>
    }
    <div className={styles.playerControl}>
      <button className={styles.playerBtn} onClick={playAction}>
        {playing ? <PauseIcon/> : <PlayIcon/> }
      </button>
    </div>
  </div>
}

export default Player;
