import React, { useState } from 'react';
import Button from '@components/Button';
import styles from './SelectItemsForm.module.scss';

import {ReactComponent as PlusIcon}  from '@assets/icons/plus-outline.svg';
import {ReactComponent as SearchIcon} from '@assets/icons/search-outline.svg';
import {ReactComponent as CloseIcon}  from '@assets/icons/close-outline.svg';

const SelectItemsForm = ({ name, className, addToList, removeFromList, list, suggestList }) => {
  const [newItem, setNewItem] = useState('');
  const [suggest, setSuggest] = useState(suggestList);

  const handleChange = (ev) => {
    setSuggest(suggestList.filter(el => el.toLowerCase().indexOf(ev.target.value.toLowerCase()) >= 0));
    setNewItem(ev.target.value);
  };

  return <div className={`${styles.row} ${className}`}>
    <div className={styles.col}>
      <header className={styles.header}>Suggested {name}</header>
      <div className={styles.content}>
        {
          suggest.slice(0, 6).map((item, index) => <div className={styles.item} key={index}>
            <div className={styles.text}>{item}</div>
            <Button classes={`${styles.btn} ${styles.add}`} kind="outline" size="sm" onClick={() => addToList(item)}>
              <PlusIcon />
            </Button>
          </div>)
        }
        {
          suggest.length > 6 && (<div className={styles.itemText}><div className={styles.text}>Too long list of skills. Filter it using field below</div></div>)
        }
        <div className={`${styles.item} ${styles.addNew}`}>
          <input
            name="item"
            type="text"
            placeholder={`Search ${name}`}
            className={styles.field}
            onChange={handleChange}
            value={newItem}
          />
          <Button classes={`${styles.btn} ${styles.add}`} kind="outline" size="sm">
            <SearchIcon />
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
