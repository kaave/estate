import React, { memo } from 'react';
import Link from 'next/link';

import styles from './index.module.scss';

const links = ['about', 'posts', 'slides', 'contact'] as const;

const height = 4;
const spans = [...Array(56 / height).keys()].map(() => `${70 + Math.floor(Math.random() * 30)}%`);

type Props = {
  current?: typeof links[number];
};

export const GlobalHeader = memo(({ current }: Props) => (
  <header id="header" className={styles.root}>
    <div className={styles.bg} role="presentation">
      {spans.map((width) => (
        <span className={styles.bgLine} style={{ width, height }} />
      ))}
    </div>
    <div className={styles.inner}>
      <div className={styles.leftPane}>
        <Link href="/">
          <a className={styles.headerLink}>
            <h1 className={styles.header}>kaave.info</h1>
          </a>
        </Link>
      </div>
      <div className={styles.rightPane}>
        <ul className={styles.linkList}>
          {links.map((link) => (
            <li key={link} className={styles.linkCell}>
              <Link href={link}>
                <a className={styles.link} aria-current={link === current ? 'page' : undefined}>
                  {link}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </header>
));
