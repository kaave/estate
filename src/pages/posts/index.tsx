import React from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import getYear from 'date-fns/getYear';

import type { Post } from '@domains/valueObjects/Post';
import { normalizePost } from '@domains/valueObjects/Post';
import { PostsTemplate } from '@templates/Posts';

type Posts = Record<number, Post[]>;
type Props = {
  posts: Posts;
};

export default React.memo(({ posts }: Props) => {
  const orderedPosts = React.useMemo(() => Object.entries(posts).sort().reverse(), [posts]);
  const { asPath } = useRouter();

  return <PostsTemplate posts={orderedPosts} pathname={asPath} />;
});

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { default: rawPosts } = await import('../../../public/static/posts/all.json');

  return {
    props: {
      posts: rawPosts.reduce<Posts>((acc, rawPost) => {
        const post = normalizePost(rawPost);
        const year = getYear(new Date(post.published));
        return { ...acc, [year]: [...(!!acc[year] ? acc[year] : []), post] };
      }, {}),
    },
  };
};
