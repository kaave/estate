import React from 'react';
import Link from 'next/link';
import format from 'date-fns/format';

import type { Post } from '@domains/valueObjects/Post';
import { Layout } from '@layouts/Default';

type Props = {
  tag: string;
  posts: Post[];
  pathname: string;
};

export const TagTemplate = React.memo(({ tag, posts, pathname }: Props) => (
  <Layout appendTitles={[tag, 'TAG']} descriptionArgv={tag} path={pathname}>
    <section>
      <h3>{tag}</h3>
      <ul>
        {posts.map(({ title, published }) => (
          <Row key={published} title={title} published={published} />
        ))}
      </ul>
    </section>
  </Layout>
));

type RowProps = Pick<Post, 'title' | 'published'>;

const Row = ({ title, published }: RowProps) => {
  const datetime = React.useMemo(() => format(new Date(published), 'MMM, dd'), [published]);

  return (
    <li>
      <Link href="/posts/[published]" as={`/posts/${published}`}>
        <a>
          {datetime} | {title}
        </a>
      </Link>
    </li>
  );
};
