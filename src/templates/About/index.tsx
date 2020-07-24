import React, { useCallback, useReducer } from 'react';

import { Layout } from '@layouts/Default';
import { RouteHeader } from '@components/shared/RouteHeader';
import { SectionHeader } from '@components/shared/SectionHeader';

import styles from './index.module.scss';

type Props = {
  pathname: string;
};

const reducer = (
  state: { [K in 'hiddenAbout' | 'hiddenSkills' | 'hiddenLikes']: boolean },
  action: { type: 'intersectAbout' | 'intersectSkills' | 'intersectLikes' },
) => {
  switch (action.type) {
    case 'intersectAbout':
      return { ...state, hiddenAbout: false };
    case 'intersectSkills':
      return { ...state, hiddenSkills: false };
    case 'intersectLikes':
      return { ...state, hiddenLikes: false };
    default:
      return state;
  }
};

const initialState = {
  hiddenAbout: true,
  hiddenSkills: true,
  hiddenLikes: true,
} as const;

export const AboutTemplate = ({ pathname }: Props) => {
  const [{ hiddenAbout, hiddenSkills, hiddenLikes }, dispatch] = useReducer(reducer, initialState);
  const handleIntersectAbout = useCallback(() => dispatch({ type: 'intersectAbout' }), []);
  const handleIntersectSkills = useCallback(() => dispatch({ type: 'intersectSkills' }), []);
  const handleIntersectLikes = useCallback(() => dispatch({ type: 'intersectLikes' }), []);

  return (
    <Layout appendTitles={['ABOUT']} descriptionArgv="概要" path={pathname}>
      <div className={styles.inner}>
        <RouteHeader lineCount={16} hidden={hiddenAbout} onIntersect={handleIntersectAbout}>
          About
        </RouteHeader>
        <p className={styles.desc}>うんたらかんたら</p>
        <SectionHeader hidden={hiddenSkills} onIntersect={handleIntersectSkills}>
          Skills
        </SectionHeader>
        <p className={styles.desc}>うんたらかんたら</p>
        <SectionHeader hidden={hiddenLikes} onIntersect={handleIntersectLikes}>
          Likes
        </SectionHeader>
        <p className={styles.desc}>うんたらかんたら</p>
      </div>
    </Layout>
  );
};
