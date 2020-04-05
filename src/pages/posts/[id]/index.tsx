import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import type { RawPost } from '@domains/responses/RawPost';
import { normalizePost, getMockPost } from '@domains/valueObjects/Post';
import type { Post } from '@domains/valueObjects/Post';
import { Layout } from '@layouts/Default';

type Props = {
  post: Post;
};

const Posts = React.memo(({ post }: Props) => {
  return (
    <Layout appendTitles={[post.title, 'POSTS']} description={post.title}>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: post.post ?? '' }} />
    </Layout>
  );
});

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  if (!ctx.params?.id) return { props: { post: getMockPost() } };
  const { default: post } = (await import(`../../../../public/static/posts/${ctx.params.id}.json`)) as {
    default: RawPost;
  };

  return {
    props: {
      post: normalizePost(post),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { default: posts } = await import('../../../../public/static/posts/all.json');
  const paths = posts.map(({ sys: { id } }) => ({ params: { id } }));
  return {
    paths,
    fallback: true,
  };
};

export default Posts;
