import React from 'react';

import { Layout } from '@layouts/Default';
import { Facebook } from '@components/icon/Facebook';
import { GitHub } from '@components/icon/GitHub';
import { Wantedly } from '@components/icon/Wantedly';
import { Twitter } from '@components/icon/Twitter';
import { RouteHeader } from '@components/shared/RouteHeader';

import styles from './index.module.scss';

const sns: Readonly<{
  key: string;
  url: string;
  desc: string;
  icon: typeof Facebook | typeof GitHub | typeof Wantedly | typeof Twitter;
}>[] = [
  { key: 'twitter', url: 'https://twitter.com/junkjunctions', desc: '@junkjunctions', icon: Twitter },
  { key: 'facebook', url: 'https://www.facebook.com/kyousuke.abe.9', desc: 'Kyousuke Abe', icon: Facebook },
  { key: 'github', url: 'https://github.com/kaave', desc: 'kaave', icon: GitHub },
  { key: 'wantedly', url: 'https://www.wantedly.com/users/57487254', desc: '安部亨佑', icon: Wantedly },
];

type Props = {
  pathname: string;
};

export const ContactTemplate = ({ pathname }: Props) => (
  <Layout appendTitles={['CONTACT']} descriptionArgv="お問い合わせ" path={pathname}>
    <div className={styles.inner}>
      <RouteHeader lineCount={16} hidden>
        Contact
      </RouteHeader>
      <p className={styles.desc}>各種SNSよりお問い合わせくださいませ。</p>
      <ul className={styles.snsList}>
        {sns.map(({ key, url, desc, icon: Component }) => (
          <li key={key} className={styles.snsCell}>
            <a href={url} className={styles.snsLink}>
              <span className={styles.snsLinkInner}>
                <span className={styles.snsLinkIconWrapper}>
                  <Component width="1em" height="1em" />
                </span>
                {desc}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);
