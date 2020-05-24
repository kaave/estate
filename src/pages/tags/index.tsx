import React from 'react';
import type { GetStaticProps } from 'next';

import type { Post } from '@domains/valueObjects/Post';
import { normalizePost } from '@domains/valueObjects/Post';
import { TagsTemplate } from '@templates/Tags';
import { useRouter } from 'next/router';

type Tags = Record<string, Post[]>;
type Props = {
  tags: Tags;
};

export default React.memo(({ tags }: Props) => {
  const orderedTags = React.useMemo(() => Object.entries(tags).sort().reverse(), [tags]);
  const { asPath } = useRouter();

  return <TagsTemplate tags={orderedTags} pathname={asPath} />;
});

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { default: rawPosts } = await import('../../../public/static/posts/all.json');

  return {
    props: {
      tags: rawPosts.reduce<Tags>((acc, rawPost) => {
        const post = normalizePost(rawPost);
        // eslint-disable-next-line no-return-assign
        post.tags.forEach((tag) => (acc[tag] = [...(!!acc[tag] ? acc[tag] : []), post]));
        return acc;
      }, {}),
    },
  };
};
