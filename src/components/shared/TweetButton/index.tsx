import React from 'react';

import { Twitter } from '@components/icon/Twitter';
import * as configs from '@utils/configs';
import styles from './index.module.scss';

type Props = {
  path: string;
  text?: string;
  size?: number;
};

export const TweetButton = ({ path, text, size = 24 }: Props) => (
  <a
    className={styles.root}
    href={`https://twitter.com/share?url=${configs.baseUrl + path}${
      text ? `&text=${encodeURIComponent(`${text} |`)}` : ''
    }`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Tweet"
  >
    <Twitter width={size} height={size} />
  </a>
);
