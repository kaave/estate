import React from 'react';
import { GetStaticProps } from 'next';

import { normalizePost } from '@domains/valueObjects/Post';
import type { Post } from '@domains/valueObjects/Post';
import { RootTemplate } from '@templates/Root';

type Props = {
  posts?: Post[];
};

export default React.memo(({ posts = [] }: Props) => <RootTemplate posts={posts} />);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { default: posts } = await import(`../../public/static/posts/all.json`);

  return { props: { posts: posts.map((post) => normalizePost(post)) } };
};
