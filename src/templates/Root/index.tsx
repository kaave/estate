import React from 'react';
import Link from 'next/link';

import { Layout } from '@layouts/Default';
import type { Post } from '@domains/valueObjects/Post';

type Props = {
  posts: Post[];
  tags: { tag: string; count: number }[];
};

export const RootTemplate = ({ posts, tags }: Props) => (
  <Layout>
    {posts.length > 0 ? (
      <ul>
        {posts.map(({ title, published }) => (
          <li key={published}>
            <Link href="/posts/[published]" as={`/posts/${published}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    ) : null}
    {tags.length > 0 ? (
      <ul>
        {tags.map(({ tag, count }) => (
          <li key={tag}>
            <Link href="/tags/[tag]" as={`/tags/${tag}`}>
              <a>
                #{tag} ({count})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    ) : null}
  </Layout>
);
