import React, { useState } from 'react';
import Logo from '@components/Logo';
import Button from '@components/Button';
import SearchForm from '@forms/SearchForm';
import { Link } from "react-router-dom";

import styles from './Header.module.scss';

const Header = () => {
  const [auth, setAuth] = useState(false);

  return <header className={styles.header}>
    <div className="container">
      <div className={styles.grid}>
        <Logo />
        <SearchForm className={styles.searchForm} />
        <div className={styles.user}>
          {
            auth ? <>
              
            </> : <>
              <Link to="/sign_in" className={styles.signIn}>Sign in</Link>
              <Button element={Link} to="create_account" size="lg" kind="fill" classes={styles.createAccount}>Create Free account</Button>
            </>
          }
        </div>
      </div>
    </div>
  </header>
}

export default Header;
