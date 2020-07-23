import React from 'react';
import Link from 'next/link';

import { links } from '@utils/links';
import * as configs from '@utils/configs';
import styles from './index.module.scss';

type Props = {
  current?: typeof links[number];
};

export const GlobalFooter = ({ current }: Props) => (
  <footer className={styles.root}>
    <div className={styles.inner}>
      <h2 className={styles.header}>
        <Link href="/">
          <a className={styles.headerLink}>{configs.title}</a>
        </Link>
      </h2>
      <div className={styles.bottomPane}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link} className={styles.cell}>
                <Link href={`/${link}`}>
                  <a className={styles.link} aria-current={current === link ? 'page' : undefined}>
                    <span className={styles.linkText}>{link}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.copyright}>
          <small className={styles.copyrightText}>© kaave</small>
        </p>
      </div>
    </div>
  </footer>
);
