import React, { useMemo } from 'react';
import Link from 'next/link';

import { createPortal } from 'react-dom';
import styles from './index.module.scss';

const links = ['about', 'posts', 'slides', 'contact'] as const;

const height = 4;
const spans = [...Array(56 / height).keys()];

type Props = {
  onClickHamburger: () => void;
  visibleModal?: boolean;
  current?: typeof links[number];
};

export const GlobalHeader = ({ onClickHamburger, visibleModal, current }: Props) => (
  <>
    <header id="header" className={styles.root}>
      <div className={styles.bg} role="presentation">
        {spans.map((i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={i} className={styles.bgLine} style={{ height }} />
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
        <div className={`${styles.rightPane} -hidden-sp`}>
          <ul className={styles.linkList}>
            {links.map((link) => (
              <LinkCell key={link} link={link} current={link === current} />
            ))}
          </ul>
        </div>
        <button
          className={styles.hamburger}
          type="button"
          aria-label="Open menu"
          aria-pressed={visibleModal || undefined}
          onClick={onClickHamburger}
        />
      </div>
    </header>
    {typeof document !== 'undefined' ? <Modal visibleModal={visibleModal} current={current} /> : undefined}
  </>
);

const Modal = ({ visibleModal, current }: Pick<Props, 'visibleModal' | 'current'>) => {
  const ModalBgLines = useMemo(
    () => () => (
      <>
        {[...Array(32).keys()].map((i) => (
          <span key={i} className={styles.modalBgLine} />
        ))}
      </>
    ),
    [],
  );

  return createPortal(
    <aside className={styles.modal} hidden={!visibleModal || undefined}>
      <div className={styles.modalBg}>
        <ModalBgLines />
      </div>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <LinkCell key={link} link={link} current={link === current} bgLine />
        ))}
      </ul>
    </aside>,
    document.body,
  );
};

const LinkCell = ({ link, current, bgLine }: { link: string; current: boolean; bgLine?: boolean }) => (
  <li className={styles.linkCell}>
    <Link href={`/${link}`}>
      <a className={styles.link} aria-current={current ? 'page' : undefined}>
        <span className={styles.linkInner}>
          {bgLine ? (
            <span className={styles.linkBg}>
              {[...Array(16).keys()].map((i) => (
                <span key={i} className={styles.linkBgLine} />
              ))}
            </span>
          ) : undefined}
          <span className={styles.linkText}>{link}</span>
        </span>
      </a>
    </Link>
  </li>
);
