import React from 'react';
import NextHead from 'next/head';

import * as configs from '@utils/configs';

type Props = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  card?: 'summary' | 'summary_large_image';
  twitterAccount?: string;
  children?: HTMLMetaElement[];
};

export const Head = React.memo(
  ({
    title = configs.title,
    description = configs.description,
    image = configs.ogp,
    url = configs.baseUrl,
    type = 'website',
    card = 'summary',
    twitterAccount = configs.authorTwitter,
    children,
  }: Props) => (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Google */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />

      {/* facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      {twitterAccount ? <meta name="twitter:site" content={twitterAccount} /> : null}
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content={card} />
      <meta name="twitter:image" content={image} />
      {children}
    </NextHead>
  ),
);
