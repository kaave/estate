import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import format from 'date-fns/format';

import type { RawPost } from '@domains/responses/RawPost';
import { normalizePost, getMockPost } from '@domains/valueObjects/Post';
import type { Post } from '@domains/valueObjects/Post';
import { PostTemplate } from '@templates/Post';

type Props = {
  post?: Post;
};

export default React.memo(({ post: { published, ...rest } = getMockPost() }: Props) => {
  const datetime = React.useMemo(() => format(new Date(published), 'yyyy/MM/dd'), [published]);
  const { asPath } = useRouter();

  return <PostTemplate post={{ published: datetime, ...rest }} pathname={asPath} />;
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
