import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { normalizePost } from '@domains/valueObjects/Post';
import type { Post } from '@domains/valueObjects/Post';
import { TagTemplate } from '@templates/Tag';

type Props = {
  tag: string;
  posts: Post[];
};

export default React.memo(({ tag = '', posts = [] }: Props) => {
  const { asPath } = useRouter();
  return <TagTemplate tag={tag} posts={posts} pathname={asPath} />;
});

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const tag = ctx.params?.tag;
  if (typeof tag !== 'string') return { props: { tag: '', posts: [] } };
  const { default: rawPosts } = await import('../../../../public/static/posts/all.json');
  const posts = rawPosts.map((post) => normalizePost(post)).filter((post) => post.tags.includes(tag));

  return {
    props: { tag, posts },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { default: posts } = await import('../../../../public/static/posts/all.json');
  const paths = posts
    .reduce<string[]>((acc, { fields: { tags = [] } }) => [...acc, ...tags.filter((tag) => !acc.includes(tag))], [])
    .map((tag) => ({ params: { tag } }));

  return {
    paths,
    fallback: true,
  };
};
