import React from 'react';
import { useRouter } from 'next/router';

import { Layout } from '@layouts/Default';

export default () => {
  const { asPath } = useRouter();

  return (
    <Layout appendTitles={['SLIDES']} descriptionArgv="このページはまだ製作中です。" path={asPath}>
      <div
        style={{
          display: 'flex',
          padding: '5em',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Under construction;
      </div>
    </Layout>
  );
};
