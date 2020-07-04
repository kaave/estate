import React, { useCallback, useState } from 'react';

import type { Post } from '@domains/valueObjects/Post';
import { Layout } from '@templates/layouts/Default';
import { RouteHeader } from '@components/shared/RouteHeader';
import { Section } from './parts/Section';

import styles from './index.module.scss';

type Props = {
  posts: [string, Post[]][];
  pathname: string;
};

export const PostsTemplate = ({ posts, pathname }: Props) => {
  const [hiddenHeader, setHiddenHeader] = useState(true);
  const handleIntersectHeader = useCallback(() => setHiddenHeader(false), []);

  return (
    <Layout appendTitles={['POSTS']} descriptionArgv="投稿一覧ページです。" path={pathname}>
      <div className={styles.inner}>
        <RouteHeader lineCount={16} hidden={hiddenHeader} onIntersect={handleIntersectHeader}>
          Posts
        </RouteHeader>
        {posts.map(([year, posts]) => (
          <Section key={year} year={year} posts={posts} />
        ))}
      </div>
    </Layout>
  );
};
