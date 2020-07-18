import React, { useMemo } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import format from 'date-fns/format';

import { links } from '@utils/links';
import { Layout } from '@layouts/Default';
import type { Post } from '@domains/valueObjects/Post';
import { Typography } from '@components/root/Typography';
import { RouteHeader } from '@components/shared/RouteHeader';
import { Label } from '@components/shared/Label';
import styles from './index.module.scss';

const linkDescriptions: Record<typeof links[number], string> = {
  about: 'わたくしについてです',
  posts: '過去の投稿一覧です',
  slides: '（工事中）',
  contact: '連絡先一覧です',
};

type Props = {
  posts: Post[];
  tags: { tag: string; count: number }[];
};

export const RootTemplate = ({ posts }: Props) => {
  const [post] = posts;
  const datetime = useMemo(() => format(new Date(post.published), 'MMM, dd yyyy'), [post.published]);

  return (
    <Layout>
      <section className={clsx(styles.section, '-first-view')}>
        <div className={styles.inner}>
          <Typography />
        </div>
      </section>
      {post ? (
        <section className={clsx(styles.section, '-post')}>
          <div className={styles.inner}>
            <RouteHeader>Latest post</RouteHeader>
            <div className={styles.postContainer}>
              <Link href="/posts/[published]" as={`/posts/${post.published}`}>
                <a className={styles.post}>
                  <div className={styles.postThumbnailWrapper}>
                    <img src={post.thumbnail.url} alt="" className={styles.postThumbnail} style={{ width: '100%' }} />
                  </div>
                  <time className={styles.postDate} dateTime={post.published}>
                    <Label>{datetime}</Label>
                  </time>
                  <span className={styles.postTitle}>{post.title}</span>
                </a>
              </Link>
            </div>
          </div>
        </section>
      ) : null}
      <section className={clsx(styles.section, '-contents')}>
        <div className={styles.inner}>
          <RouteHeader>Boring contents</RouteHeader>
          <ul className={styles.contentsList}>
            {links.map((link) => (
              <li key={link} className={styles.contentsCell}>
                <Link href={`/${link}`}>
                  <a className={styles.contentsLink}>
                    <span className={styles.contentsTitle}>
                      <Label>{link}</Label>
                    </span>
                    <span className={styles.contentsDescription}>{linkDescriptions[link]}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};
