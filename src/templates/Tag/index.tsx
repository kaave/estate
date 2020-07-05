import React, { useState, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

import type { Post } from '@domains/valueObjects/Post';
import { Layout } from '@templates/layouts/Default';
import { RouteHeader } from '@components/shared/RouteHeader';
import { Label } from '@components/shared/Label';

import styles from './index.module.scss';

type Props = {
  tag: string;
  posts: Post[];
  pathname: string;
};

export const TagTemplate = ({ tag, posts, pathname }: Props) => {
  const [hiddenHeader, setHiddenHeader] = useState(true);
  const handleIntersectHeader = useCallback(() => setHiddenHeader(false), []);

  return (
    <Layout appendTitles={[tag, 'TAG']} descriptionArgv={tag} path={pathname}>
      <div className={styles.inner}>
        <RouteHeader lineCount={16} hidden={hiddenHeader} onIntersect={handleIntersectHeader}>
          {`Tag: ${tag}`}
        </RouteHeader>
        <section className={styles.section}>
          <ul className={styles.list}>
            {posts.map(({ title, published }) => (
              <Row key={published} title={title} published={published} />
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

type RowProps = Pick<Post, 'title' | 'published'>;

const Row = ({ title, published }: RowProps) => {
  const datetime = useMemo(() => format(new Date(published), 'MMM, dd yyyy'), [published]);

  return (
    <li className={styles.row}>
      <Link href="/posts/[published]" as={`/posts/${published}`}>
        <a className={styles.link}>
          <time className={styles.date} dateTime={datetime}>
            <Label>{datetime}</Label>
          </time>
          {title}
          <span className={styles.linkLine} role="presentation" />
        </a>
      </Link>
    </li>
  );
};
