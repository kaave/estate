import React from 'react';

import type { Post } from '@domains/valueObjects/Post';
import { Layout } from '@layouts/Default';
import styles from './index.module.scss';

type Props = {
  post: Post;
  pathname: string;
};

export const PostTemplate = ({ post: { title, post, published, thumbnail, tags }, pathname }: Props) => (
  <Layout appendTitles={[title, 'POSTS']} descriptionArgv={title} path={pathname}>
    <article className={styles.root}>
      <h2 className={styles.header}>
        {title}
        <time className={styles.published} dateTime={published}>
          {published}
        </time>
      </h2>
      <img src={thumbnail.url} alt={thumbnail.title} />
      {tags.length > 0 ? (
        <ul>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      {/* eslint-disable-next-line react/no-danger */}
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post }} />
    </article>
  </Layout>
);
