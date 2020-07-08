import React, { useMemo } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import format from 'date-fns/format';

import type { RawPost } from '@domains/responses/RawPost';
import { normalizePost, getMockPost } from '@domains/valueObjects/Post';
import type { Post } from '@domains/valueObjects/Post';
import { PostTemplate } from '@templates/Post';

type Props = {
  post?: Post;
  prev: Post | null;
  next: Post | null;
};
export default ({ post = getMockPost(), prev, next }: Props) => {
  const { published, ...rest } = post;
  const datetime = useMemo(() => format(new Date(published), 'yyyy/MM/dd'), [published]);
  const { asPath } = useRouter();

  return (
    <PostTemplate
      post={{ published: datetime, ...rest }}
      pathname={asPath}
      prev={prev ?? undefined}
      next={next ?? undefined}
    />
  );
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const published = ctx.params?.published;
  if (!published) return { props: { post: getMockPost(), prev: null, next: null } };
  const { default: post } = (await import(`../../../../public/static/posts/${published}.json`)) as { default: RawPost };
  const { default: rawPosts } = await import('../../../../public/static/posts/all.json');

  const posts = rawPosts.map((rawPost) => normalizePost(rawPost));
  const currentIndex = posts.findIndex((post) => post.published === published);

  return {
    props: {
      post: normalizePost(post),
      prev: posts[currentIndex - 1] ?? null,
      next: posts[currentIndex + 1] ?? null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { default: posts } = await import('../../../../public/static/posts/all.json');
  const paths = posts.map(({ fields: { published } }) => ({ params: { published } }));
  return {
    paths,
    fallback: true,
  };
};
