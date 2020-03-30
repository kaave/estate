import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import type { Post } from '@domains/responses/Post';
import omoriImage from '@images/omori_futan_woman.png';
import unsplashImage from '@images/sai-de-silva-4-gFGb12hFA-unsplash.jpg';
import styles from './index.module.scss';

type Props = {
  posts?: Post[];
};

const Page = React.memo(({ posts }: Props) => {
  return (
    <main id="main" className={styles.Main} role="main">
      <h1>Hello, World!</h1>
      <img src={omoriImage} alt="" />
      <img src={unsplashImage} alt="" />
      <Link href="/second-page">
        <a>Goto Second Page</a>
      </Link>
      {!!posts?.length ? (
        <ul>
          {posts.map(({ sys, fields }) => (
            <li key={sys.id}>
              <Link href={`/posts/${sys.id}`}>
                <a>{fields.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
});

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { default: posts } = await import(`../../public/static/posts/all.json`);

  return { props: { posts } };
};

export default Page;
