import React from 'react';

import { Twitter } from '@components/icon/Twitter';
import * as configs from '@utils/configs';

type Props = {
  path: string;
  text?: string;
  size?: number;
};

export const TweetButton = ({ path, text, size = 24 }: Props) => (
  <a
    href={`https://twitter.com/share?url=${configs.baseUrl + path}${
      text ? `&text=${encodeURIComponent(`${text} | ${configs.title}`)}` : ''
    }`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Tweet"
  >
    <Twitter width={size} height={size} />
  </a>
);
