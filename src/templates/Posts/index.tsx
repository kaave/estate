import React from 'react';
import Link from 'next/link';
import format from 'date-fns/format';

import type { Post } from '@domains/valueObjects/Post';
import { Layout } from '@templates/layouts/Default';

type Props = {
  posts: [string, Post[]][];
  pathname: string;
};

export const PostsTemplate = React.memo(({ posts, pathname }: Props) => (
  <Layout appendTitles={['POSTS']} descriptionArgv="投稿一覧ページです。" path={pathname}>
    {posts.map(([year, postList]) => (
      <section key={year}>
        <h3>{year}</h3>
        <ul>
          {postList.map(({ title, published }) => (
            <Row key={published} title={title} published={published} />
          ))}
        </ul>
      </section>
    ))}
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
