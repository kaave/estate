import React, { useMemo, useState, useCallback } from 'react';

import { SectionHeader } from '@components/shared/SectionHeader';
import type { Post } from '@domains/valueObjects/Post';
import { format } from 'date-fns';
import Link from 'next/link';

import { Label } from '@components/shared/Label';
import styles from './index.module.scss';

type Props = {
  year: string;
  posts: Post[];
};

export const Section = ({ year, posts }: Props) => {
  const [hiddenHeader, setHiddenHeader] = useState(true);
  const handleIntersectHeader = useCallback(() => setHiddenHeader(false), []);

  return (
    <section className={styles.root}>
      <SectionHeader hidden={hiddenHeader} onIntersect={handleIntersectHeader}>
        {year}
      </SectionHeader>
      <ul className={styles.list}>
        {posts.map(({ title, published }) => (
          <Row key={published} title={title} published={published} />
        ))}
      </ul>
    </section>
  );
};

type RowProps = Pick<Post, 'title' | 'published'>;

const Row = ({ title, published }: RowProps) => {
  const datetime = useMemo(() => format(new Date(published), 'MMM, dd'), [published]);

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
