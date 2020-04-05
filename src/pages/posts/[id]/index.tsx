import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import format from 'date-fns/format';

import type { RawPost } from '@domains/responses/RawPost';
import { normalizePost, getMockPost } from '@domains/valueObjects/Post';
import type { Post } from '@domains/valueObjects/Post';
import { Layout } from '@layouts/Default';
import styles from './index.module.scss';

type Props = {
  post?: Post;
};

const Posts = React.memo(({ post: { title, post, published, thumbnail, tags } = getMockPost() }: Props) => {
  const datetime = React.useMemo(() => format(new Date(published), 'yyyy/MM/dd'), [published]);
  const { asPath } = useRouter();

  return (
    <Layout appendTitles={[title, 'POSTS']} description={title} path={asPath}>
      <h2 className={styles.header}>
        {title}
        <time className={styles.published} dateTime={datetime}>
          {datetime}
        </time>
      </h2>
      <img src={thumbnail.url} alt={thumbnail.title} />

      {tags.length > 0 ? (
        <ul>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      {/* eslint-disable-next-line react/no-danger */}
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post }} />
    </Layout>
  );
});

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  if (!ctx.params?.id) return { props: { post: getMockPost() } };
  const { default: post } = (await import(`../../../../public/static/posts/${ctx.params.id}.json`)) as {
    default: RawPost;
  };

  return {
    props: {
      post: normalizePost(post),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { default: posts } = await import('../../../../public/static/posts/all.json');
  const paths = posts.map(({ sys: { id } }) => ({ params: { id } }));
  return {
    paths,
    fallback: true,
  };
};

export default Posts;
