import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import type { Post } from '@domains/responses/Post';

type Props = {
  post?: Post;
};

const Posts = React.memo((props: Props) => {
  console.log(props);
  return <div>hello world!</div>;
});

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  if (!ctx.params?.id) return { props: {} };
  const { default: post } = await import(`../../../public/static/posts/${ctx.params.id}.json`);

  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { default: posts } = await import('../../../public/static/posts/all.json');
  const paths = posts.map(({ sys: { id } }) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
};

export default Posts;
