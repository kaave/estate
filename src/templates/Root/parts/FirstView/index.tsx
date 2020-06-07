import React from 'react';
import Link from 'next/link';

import { Typography } from '@components/root/Typography';
import type { Post } from '@domains/valueObjects/Post';

import styles from './index.module.scss';

type Props = {
  post: Post;
};

export const FirstView = ({ post }: Props) => (
  <section className={styles.root}>
    <div className={styles.inner}>
      <div className={styles.left}>
        <Typography />
      </div>
      <div className={styles.right}>
        <div key={post.published}>
          <h2 className="latest-post">Latest post</h2>
          <Link href="/posts/[published]" as={`/posts/${post.published}`}>
            <a>
              <img src={post.thumbnail.url} alt="" style={{ width: '100%' }} />
              {post.title}
            </a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);
