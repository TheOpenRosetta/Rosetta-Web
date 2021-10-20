import React from 'react';
import Header from '@components/Header';
import Navigation from '@components/Navigation';

import styles from './Layout.module.scss';

const Layout = ({ navigation, children, format }) => {
  return <div className={styles.layout}>
    <Header />
    {
      format === 'full' ? (
        <div className={styles.grid}>
          {navigation && (
            <aside className={styles.navFull}>
              <Navigation/>
            </aside>
          )}
          <div className={styles.contentFull}>{children}</div>
        </div>
      ) : (
        <div className="container">
          <div className={styles.grid}>
            {navigation && (
              <aside className={styles.nav}>
                <Navigation/>
              </aside>
            )}
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      )
    }
  </div>
}

export default Layout;
