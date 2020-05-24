import React from 'react';
import Link from 'next/link';
import format from 'date-fns/format';

import type { Post } from '@domains/valueObjects/Post';
import { Layout } from '@layouts/Default';

type Props = {
  tags: [string, Post[]][];
  pathname: string;
};

export const TagsTemplate = React.memo(({ tags, pathname }: Props) => (
  <Layout appendTitles={['TAGS']} descriptionArgv="タグ一覧ページです。" path={pathname}>
    {tags.map(([tag, postList]) => (
      <section key={tag}>
        <h3>{tag}</h3>
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
