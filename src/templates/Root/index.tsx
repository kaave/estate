import React from 'react';
import Link from 'next/link';

import { links } from '@utils/links';
import { Layout } from '@layouts/Default';
import type { Post } from '@domains/valueObjects/Post';
import { Typography } from '@components/root/Typography';

type Props = {
  posts: Post[];
  tags: { tag: string; count: number }[];
};
const styles = {} as any;

export const RootTemplate = ({ posts }: Props) => {
  const post = posts[0];

  return (
    <Layout>
      <section className={styles.typography}>
        <div className={styles.typographyInner}>
          <Typography />
        </div>
      </section>
      {post ? (
        <section className={styles.latest}>
          <div className={styles.latestInner}>
            <h2 className={styles.latestHeading}>Latest post</h2>
            <Link href="/posts/[published]" as={`/posts/${post.published}`}>
              <a>
                <img src={post.thumbnail.url} alt="" style={{ width: '100%' }} />
                {post.title}
              </a>
            </Link>
          </div>
        </section>
      ) : null}
      <section className={styles.contents}>
        <div className={styles.contentsInner}>
          <h2 className={styles.contentsHeading}>Contents</h2>
          {links.map((link) => (
            <li key={link} className={styles.linkCell}>
              <Link href={`/${link}`}>
                <a className={styles.link}>
                  <span className={styles.linkInner}>
                    <span className={styles.linkText}>{link}</span>
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </div>
      </section>
    </Layout>
  );
};
