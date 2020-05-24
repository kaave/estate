import React, { memo } from 'react';
import type { GetStaticProps } from 'next';

import { normalizePost } from '@domains/valueObjects/Post';
import type { Post } from '@domains/valueObjects/Post';
import { RootTemplate } from '@templates/Root';

type Props = {
  posts?: Post[];
  tags?: { tag: string; count: number }[];
};

export default memo(({ posts = [], tags = [] }: Props) => <RootTemplate posts={posts} tags={tags} />);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { default: posts } = await import(`../../public/static/posts/all.json`);

  return {
    props: {
      posts: posts.map((post) => normalizePost(post)),
      tags: Object.entries(
        posts.reduce<Record<string, number>>((acc, post) => {
          // eslint-disable-next-line no-return-assign
          post.fields.tags?.forEach((tag) => (acc[tag] = (acc[tag] ?? 0) + 1));
          return acc;
        }, {}),
      ).map(([tag, count]) => ({ tag, count })),
    },
  };
};
