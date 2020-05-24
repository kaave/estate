import React, { memo, useMemo } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import format from 'date-fns/format';

import type { RawPost } from '@domains/responses/RawPost';
import { normalizePost, getMockPost } from '@domains/valueObjects/Post';
import type { Post } from '@domains/valueObjects/Post';
import { PostTemplate } from '@templates/Post';

type Props = {
  post?: Post;
};
export default memo(({ post = getMockPost() }: Props) => {
  const { published, ...rest } = post;
  const datetime = useMemo(() => format(new Date(published), 'yyyy/MM/dd'), [published]);
  const { asPath } = useRouter();

  return <PostTemplate post={{ published: datetime, ...rest }} pathname={asPath} />;
});

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const published = ctx.params?.published;
  if (!published) return { props: { post: getMockPost() } };
  const { default: post } = (await import(`../../../../public/static/posts/${published}.json`)) as { default: RawPost };

  return {
    props: {
      post: normalizePost(post),
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
