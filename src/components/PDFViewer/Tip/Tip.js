import React, { useState, useEffect } from "react";

import {ReactComponent as EditIcon} from '@assets/icons/edit-outline.svg';
import styles from './Tip.module.scss';

const Tip = ({ onUpdate, onConfirm, onOpen }) => {
  const [compact, setCompact] = useState(true);
  const [text, setText] = useState('');

  useEffect(() => {
    if (onUpdate) {
      onUpdate();
    }
  }, [onUpdate, compact]);

  return (
    <div className={styles.tip}>
      {compact ? (
        <div
          className={styles.tipCompact}
          onClick={() => {
            onOpen();
            setCompact(false);
          }}
        >
          <EditIcon /> Add highlight
        </div>
      ) : (
        <form
          className={styles.tipCard}
          onSubmit={(event) => {
            event.preventDefault();
            onConfirm({ text });
          }}
        >
          <div>
            <div className={styles.tipTextareaTitle}>Write your comment</div>
            <textarea
              placeholder="Your comment"
              autoFocus
              value={text}
              className={styles.tipTextarea}
              onChange={(event) =>
                setText(event.target.value)
              }
              ref={(node) => {
                if (node) {
                  node.focus();
                }
              }}
            />
          </div>
          <div className={styles.tipAction}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      )}
    </div>
  );
}

export default Tip;
