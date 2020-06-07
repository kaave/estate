import React from 'react';
import Link from 'next/link';

import { Layout } from '@layouts/Default';
import type { Post } from '@domains/valueObjects/Post';
import { FirstView } from './parts/FirstView';

type Props = {
  posts: Post[];
  tags: { tag: string; count: number }[];
};

export const RootTemplate = ({ posts, tags }: Props) => (
  <Layout>
    <FirstView post={posts[0]} />
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
