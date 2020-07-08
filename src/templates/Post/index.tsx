import React, { useRef, useState } from 'react';

import type { Post } from '@domains/valueObjects/Post';
import { Layout } from '@layouts/Default';
import Link from 'next/link';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { TweetButton } from '@components/shared/TweetButton';
import { Content } from './parts/Content';
import styles from './index.module.scss';

type Props = {
  post: Post;
  pathname: string;
  prev?: Pick<Post, 'title' | 'published'>;
  next?: Pick<Post, 'title' | 'published'>;
};

export const PostTemplate = ({ post: { title, post, published, thumbnail, tags }, pathname, prev, next }: Props) => {
  const headingRef = useRef<HTMLElement>(null);
  const [headingHidden, setHeadingHidden] = useState(true);
  const { unobserve } = useIntersectionObserver(
    headingRef,
    (value: IntersectionObserverEntry) => {
      if (value.intersectionRatio <= 0) return;
      setHeadingHidden(false);
      unobserve();
    },
    { threshold: [0, 1] },
  );

  return (
    <Layout appendTitles={[title, 'POSTS']} descriptionArgv={title} path={pathname}>
      <article className={styles.root}>
        <header ref={headingRef} className={styles.header} hidden={headingHidden || undefined}>
          <img className={styles.thumbnail} src={thumbnail.url} alt={thumbnail.title} />
          <h2 className={styles.heading}>
            <span className={styles.headingTitle}>
              <span className={styles.headingTitleText}>{title}</span>
            </span>
            <time className={styles.published} dateTime={published}>
              <span className={styles.publishedText}>{published}</span>
            </time>
          </h2>
          {tags.length > 0 ? (
            <ul className={styles.tagList}>
              {tags.map((tag) => (
                <li key={tag} className={styles.tagCell}>
                  <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                    <a className={styles.tagLink}>#{tag}</a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </header>
        <Content code={post} />
        <footer className={styles.footer}>
          <div className={styles.sns}>
            <TweetButton path={pathname} text={title} />
          </div>
          <nav className={styles.footerNav}>
            {prev ? (
              <Link href="/posts/[published]" as={`/posts/${prev.published}`}>
                <a className={styles.move} data-to="prev">
                  {prev.title}
                </a>
              </Link>
            ) : undefined}
            {next ? (
              <Link href="/posts/[published]" as={`/posts/${next.published}`}>
                <a className={styles.move} data-to="next">
                  {next.title}
                </a>
              </Link>
            ) : undefined}
          </nav>
        </footer>
      </article>
    </Layout>
  );
};
