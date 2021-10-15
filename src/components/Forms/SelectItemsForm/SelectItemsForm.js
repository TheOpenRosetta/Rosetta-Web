import React, { useState } from 'react';
import Button from '@components/Button';
import styles from './SelectItemsForm.module.scss';

import {ReactComponent as PlusIcon}  from '@assets/icons/plus-outline.svg';
import {ReactComponent as CloseIcon}  from '@assets/icons/close-outline.svg';

const SelectItemsForm = ({ name, className, addToList, removeFromList, addToSuggestList, list, suggestList }) => {
  const [newItem, setNewItem] = useState('');
  console.log(suggestList);
  console.log(list);

  const handleChange = (ev) => setNewItem(ev.target.value);

  const addNewItem = () => {
    if (newItem.length > 1) {
      addToSuggestList(newItem);
      setNewItem('');
    }
  };

  return <div className={`${styles.row} ${className}`}>
    <div className={styles.col}>
      <header className={styles.header}>Suggested {name}</header>
      <div className={styles.content}>
        {
          suggestList.map((item, index) => <div className={styles.item} key={index}>
            <div className={styles.text}>{item}</div>
            <Button classes={`${styles.btn} ${styles.add}`} kind="outline" size="sm" onClick={() => addToList(item)}>
              <PlusIcon />
            </Button>
          </div>)
        }
        <div className={`${styles.item} ${styles.addNew}`}>
          <input
            name="item"
            type="text"
            placeholder={`Add new ${name}`}
            className={styles.field}
            onChange={handleChange}
            value={newItem}
          />
          <Button classes={`${styles.btn} ${styles.add}`} kind="outline" size="sm" onClick={addNewItem}>
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
    <div className={styles.col}>
      <header className={styles.header}>Selected {name}</header>
      <div className={styles.content}>
        {
          list.length > 0 ? list.map((item, index) => <div className={styles.item} key={index}>
            <div className={styles.text}>{item}</div>
            <Button classes={`${styles.btn} ${styles.remove}`} kind="link" size="sm" onClick={() => removeFromList(item)}>
              <CloseIcon />
            </Button>
          </div>) : <div className={styles.noItem}>Select any {name}</div>
        }
      </div>
    </div>
  </div>
}

export default SelectItemsForm;
